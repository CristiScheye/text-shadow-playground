import React from 'react'
import View from '../index.jsx'
import data from './data.js'

// expose React for debugging
window.React = React

React.render(<View {...data} />, document.getElementById('app'))
