import React, {PropTypes, Component} from 'react'
import _ from 'lodash'
const namespace = 'view'

const fontFamilies = {
    serif: ['Times', 'Times New Roman', 'Georgia', 'serif']
  , sansserif: ['Verdana', 'Arial', 'Helvetica', 'sans-serif']
  , monospace: ['Lucida Console', 'Courier', 'monospace']
  , cursive: ['cursive']
  , fantasy: ['fantasy']
}

export default class View extends Component {
  constructor () {
    super()
    this.state = {
      text: 'hi'
      , style: {
        color: 'rgb(25,100,34)'
        , fontFamily: fontFamilies.serif
      }
    }
  }

  onChange (field, e) {
    var newState = {}
    newState[field] = e.target.value

    this.setState(newState)
  }

  onRadioChange (e) {
    var value = e.target.value
      , name = e.target.name
      , style = this.state.style

    style[name] = fontFamilies[value]
    this.setState({style})
  }

  fontRadioButtons () {
    var self = this
    return _.map(fontFamilies, function (_fonts, family){
      return (
        <p>
          <input
            type="radio"
            name="fontFamily"
            value={family}
            onChange={self.onRadioChange.bind(self)}
          >
            {family}
          </input>
        </p>
        )
    })
  }

  render () {
    return (<div className={namespace}>
      <h1 className={`${namespace}-title`}>Text Shadow Playground</h1>

      <input onChange={_.bind(this.onChange, this, 'text')} type="text" />

      <h2 style={this.state.style}>{this.state.text}</h2>

      <ul>
        {this.fontRadioButtons.call(this)}
      </ul>

      // display whatever is in text, apply css here
      // input field for text
      // input fields to change...
        // text shadow
        // background color
        // text color
    </div>)
  }
}
