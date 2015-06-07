import React, {PropTypes, Component} from 'react'
import bind from 'lodash/function/bind'
import map from 'lodash/collection/map'

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
  onTextChange (e) {
    let text = e.target.value

    if (!text.length) {
      text = 'Text Shadow Playground'
    }

    this.setState({text})
  }

  onStyleChange (e) {
    var value = e.target.value
      , name = e.target.name
      , style = this.state.style

    style[name] = fontFamilies[value]
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

  onColorDrag (field, color) {
    let {style} = this.state
    let {shadow} = this.state

    style[field] = color
    this.setState({style})
  }


// subviews
  fontRadioButtons () {
    var self = this
    return map(fontFamilies, function (_fonts, family){
      return (
        <span style={{fontFamily: family}}>
          <input
            type="radio"
            name="fontFamily"
            value={family}
            onChange={self.onStyleChange.bind(self)}
          >
            {family}
          </input>
        </span>
        )
    })
  }

  render () {
    return (<div className={namespace}>
      <h1 className={`${namespace}-title`}>Text Shadow Playground</h1>

      <div  className={`${namespace}-demo`}>
        <h2 style={this.state.style}>{this.state.text}</h2>
      </div>

      <input onChange={bind(this.onTextChange, this)} type="text" />

      <div className="clearfix">
        <div className={`${namespace}-otherCSS`}>
          <div>{this.fontRadioButtons.call(this)}</div>
          <div className={`${namespace}-colorPickerWrapper`}>
            <label>Text Color</label>
            <ColorPicker
              defaultValue={this.state.style.color}
              onDrag={bind(this.onColorDrag, this, 'color')}/>
          </div>

          <div className={`${namespace}-colorPickerWrapper`}>
            <label>Background Color</label>
            <ColorPicker
              defaultValue={this.state.style.backgroundColor}
              onDrag={bind(this.onColorDrag, this, 'backgroundColor')}/>
          </div>
        </div>


        <div className={`${namespace}-shadowCSS`}>
          <label>Offset-X
          <input
            onChange={bind(this.onShadowChange, this, 'offsetX')}
            type="number"
            min="-5"
            max="5"
            step="0.01"
            defaultValue="0.1"
            name="offsetX" />em
          </label>

          <label>Offset-Y
          <input
            onChange={bind(this.onShadowChange, this, 'offsetY')}
            type="number"
            min="-5"
            max="5"
            step="0.01"
            defaultValue="0.1"
            name="offsetY" />em
          </label>

          <label>Blur Radius</label>
          <input
            onChange={bind(this.onShadowChange, this, 'blurRadius')}
            type="number"
            min="0"
            max="5"
            step="0.01"
            defaultValue="0.1"
            name="blurRadius" />em

          <div className={`${namespace}-colorPickerWrapper`}>
            <label>Shadow Color</label>
            <ColorPicker
              defaultValue={this.state.style.shadowColor}
              onDrag={bind(this.onShadowChange, this, 'color')}/>
          </div>
        </div>
      </div>

      <h3>CSS</h3>
      <pre><code>{JSON.stringify(this.state.style, null, 2)}</code></pre>
    </div>)
  }
}
