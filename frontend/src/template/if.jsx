import React from 'react'

export default props => {
  return props.test ? props.children : false
  // if(props.test) {
  //   return props.children
  // } else {
  //   return false
  // }
}