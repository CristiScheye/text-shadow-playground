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
        , offsetX: '1px'
        , offsetY: '2px'
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

    console.log('shadow', shadow)
    console.log('style', style)

    style.textShadow = `${shadow.offsetX} ${shadow.offsetY} ${shadow.blurRadius} ${shadow.color}`


    console.log('style', style)
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

    if (field === 'shadowColor') {
      shadow.color = color
      this.setState({shadow})
      this.setShadow()
    }
    else {
      style[field] = color
    }
    this.setState({style})
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

      <h3>Text Color</h3>
      <ColorPicker
        className={`${namespace}-textColorPicker`}
        defaultValue={this.state.style.color}
        onDrag={_.bind(this.onColorDrag, this, 'color')}/>

      <h3>Background Color</h3>
      <ColorPicker
        className={`${namespace}-backgroundColorPicker`}
        defaultValue={this.state.style.backgroundColor}
        onDrag={_.bind(this.onColorDrag, this, 'backgroundColor')}/>

      <h3>Shadow Color</h3>
      <ColorPicker
        className={`${namespace}-shadowColorPicker`}
        defaultValue={this.state.style.shadowColor}
        onDrag={_.bind(this.onColorDrag, this, 'shadowColor')}/>


      <h3>CSS</h3>
      <p>{JSON.stringify(this.state.style)}</p>
    </div>)
  }
}
