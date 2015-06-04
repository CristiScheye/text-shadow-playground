import React, {PropTypes, Component} from 'react'
import _ from 'lodash'
import ColorPicker from 'react-color-picker'
const namespace = 'shadowPlayground'

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
      text: 'Text Shadow Playground'
      , shadow: {
        color: '#000'
        , offsetX: '0.1em'
        , offsetY: '0.1em'
        , blurRadius: '2px'
      }
      , style: {
        color: '#000'
        , backgroundColor: '#FFF'
        , fontFamily: fontFamilies.serif
      }
    }

    this.setShadow()
  }

// helpers
  setShadow () {
    let {shadow} = this.state
    let {style} = this.state

    style.textShadow = `${shadow.offsetX} ${shadow.offsetY} ${shadow.blurRadius} ${shadow.color}`

    this.setState({style})
  }

// on change methods
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

  onColorDrag (field, color) {
    let {style} = this.state
    let {shadow} = this.state

    style[field] = color
    this.setState({style})
  }

  onShadowChange (field, value) {
    const {shadow} = this.state
    // colorpicker sends string, others send event
    if (field !== 'color') {
      value = value.target.value + 'em'
    }

    shadow[field] = value
    this.setState({shadow})
    this.setShadow()
    console.log(this.state)
  }

// subviews
  fontRadioButtons () {
    var self = this
    return _.map(fontFamilies, function (_fonts, family){
      return (
        <li style={{fontFamily: family}}>
          <input
            type="radio"
            name="fontFamily"
            value={family}
            onChange={self.onRadioChange.bind(self)}
          >
            {family}
          </input>
        </li>
        )
    })
  }

  render () {
    return (<div className={namespace}>
      <h1 className={`${namespace}-title`}>Text Shadow Playground</h1>

      <h2 style={this.state.style}>{this.state.text}</h2>

      <input onChange={_.bind(this.onChange, this, 'text')} type="text" />
      <ul>{this.fontRadioButtons.call(this)}</ul>

      <h3>Offset-X</h3>
      <input
        onChange={_.bind(this.onShadowChange, this, 'offsetX')}
        type="number"
        min="-5"
        max="5"
        step="0.1"
        defaultValue="0.1"
        name="offsetX" />em

      <h3>Offset-Y</h3>
      <input
        onChange={_.bind(this.onShadowChange, this, 'offsetY')}
        type="number"
        min="-5"
        max="5"
        step="0.1"
        defaultValue="0.1"
        name="offsetY" />em

      <h3>Blur Radius</h3>
      <input
        onChange={_.bind(this.onShadowChange, this, 'blurRadius')}
        type="number"
        min="0"
        max="5"
        step="0.1"
        defaultValue="0.1"
        name="blurRadius" />em

      <div className={`${namespace}-colorPickerWrapper`}>
        <h3>Text Color</h3>
        <ColorPicker
          defaultValue={this.state.style.color}
          onDrag={_.bind(this.onColorDrag, this, 'color')}/>
      </div>

      <div className={`${namespace}-colorPickerWrapper`}>
        <h3>Background Color</h3>
        <ColorPicker
          defaultValue={this.state.style.backgroundColor}
          onDrag={_.bind(this.onColorDrag, this, 'backgroundColor')}/>
      </div>

      <div className={`${namespace}-colorPickerWrapper`}>
        <h3>Shadow Color</h3>
        <ColorPicker
          defaultValue={this.state.style.shadowColor}
          onDrag={_.bind(this.onShadowChange, this, 'color')}/>
      </div>

      <h3>CSS</h3>
      <pre><code>{JSON.stringify(this.state.style, null, 2)}</code></pre>
    </div>)
  }
}
