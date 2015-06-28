import React from 'react'
import View from '../index.jsx'

// expose React for debugging
window.React = React

React.render(<View />, document.getElementById('app'))
