import React from 'react'

export default props => (
  <nav className='navbar navbar-inverse'>
    <div className='container'>
      <div className='navbar-header'>
        <a className='navbar-brand' href='#'>
          <i className='fa fa-calendar-check-o'> TodoApp</i>
        </a>
      </div>

      <div id='navbar' className='navbar-collapse'>
        <ul className='nav navbar-nav'>
          <li><a href='#/todos'>Tasks</a></li>
          <li><a href='#/about'>About</a></li>
        </ul>
      </div>
    </div>
  </nav>
)