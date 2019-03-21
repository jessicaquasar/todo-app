import React, { Component } from 'react'
import axios from 'axios'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoList from './todoList'

const URL = 'http://localhost:3003/api/todos'
export default class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = { description: '', list: [] }

    this.handleChange = this.handleChange.bind(this)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleClear = this.handleClear.bind(this)
    this.handleMarkedAsDone = this.handleMarkedAsDone.bind(this)
    this.handleMarkedAsPending = this.handleMarkedAsPending.bind(this)
    this.handleRemove = this.handleRemove.bind(this)

    this.refresh()
  }

  refresh(description = '') {
    const search = description ? `&description__regex=/${description}/i` : ''
    axios.get(`${URL}?sort=-createdAt${search}`)
      .then(resp => this.setState({ ...this.state, description, list: resp.data }))
  }

  handleChange(e) {
    this.setState({ ...this.setState, description: e.target.value })
  }

  handleAdd() {
    const description = this.state.description
    axios.post(URL, { description })
      .then(resp => this.refresh())
  }

  handleSearch() {
    this.refresh(this.state.description)
  }

  handleClear() {
    this.refresh()
  }

  handleMarkedAsDone(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
      .then(resp => this.refresh(this.state.description))
  }

  handleMarkedAsPending(todo) {
    axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
      .then(resp => this.refresh(this.state.description))
  }

  handleRemove(todo) {
    axios.delete(`${URL}/${todo._id}`)
    .then(resp => this.refresh(this.state.description))
  }

  render() {
    return (
      <div>
        <PageHeader name='Tasks' small='List'></PageHeader>
        <TodoForm 
          description={ this.state.description } 
          handleAdd={ this.handleAdd } 
          handleSearch={ this.handleSearch }
          handleClear={ this.handleClear }
          handleChange={ this.handleChange } />
        <TodoList 
          list={ this.state.list }
          handleMarkedAsDone = { this.handleMarkedAsDone }
          handleMarkedAsPending = { this.handleMarkedAsPending }
          handleRemove={ this.handleRemove }/>
      </div>
    )
  }
}
