import React, {Component} from 'react'
import bind from 'lodash/function/bind'
import map from 'lodash/collection/map'
import css from './index.css'

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

    this.onChange = this.onChange.bind(this)
    this.setShadow = this.setShadow.bind(this)

    this.state = {
      content: 'Hello World'
      , shadowColor: 'rgba(255,255,255,0.1)'
      , offsetX: '3px'
      , offsetY: '3px'
      , blurRadius: '2px'
      , textColor: 'rgba(0,0,0,0.6)'
      , backgroundColor: '#222'
      , fontFamily: fontFamilies.sansserif
    }
  }

  componentWillMount () {
    this.setShadow()
  }

// helpers
  setShadow () {
    const {offsetX, offsetY, blurRadius, shadowColor} = this.state
    const textShadow = `${offsetX} ${offsetY} ${blurRadius} ${shadowColor}`

    this.setState({textShadow})
  }

  onChange (e) {
    const {name, value} = e.target
    this.setState({[name]: value}, this.setShadow)
  }

  render () {
    const demoStyle = {
      color: this.state.textColor
      , backgroundColor: this.state.backgroundColor
      , textShadow: this.state.textShadow
      , fontFamily: this.state.fontFamily
    }

    return (<div className={css.page}>
      <div  className={css.demo}>
        <h1 style={demoStyle}>{this.state.content}</h1>
      </div>

      <div className={css.playground}>

        <div className={css.form}>
          <div className={css.inputInline}>
            <label>Demo Text</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              name="content"
              value={this.state.content}
              placeholder="Your Text Here"/>
          </div>


          <div className={css.inputInline}><label>Font Family</label>
            <select
              className={css.input}
              defaultValue="sansserif"
              name="fontFamily"
              value={this.state.fontFamily}
              onChange={this.onChange}>
              {map(fontFamilies, (fonts, label) => {
                return <option
                  key={label}
                  value={fonts}>
                  {label}
                </option>
              })}
            </select>
          </div>


          <div className={css.inputInline}><label>Offset-X</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              value={this.state.offsetX}
              name="offsetX" />
          </div>


          <div className={css.inputInline}><label>Offset-Y</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              name="offsetY"
              value={this.state.offsetY} />
          </div>


          <div className={css.inputInline}><label>Blur Radius</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              name="blurRadius"
              value={this.state.blurRadius} />
          </div>


          <div className={css.inputInline}><label>Text Color</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              name="textColor"
              value={this.state.textColor} />
          </div>


          <div className={css.inputInline}><label>Background Color</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              name="backgroundColor"
              value={this.state.backgroundColor} />
          </div>


          <div className={css.inputInline}><label>Shadow Color</label>
            <input
              className={css.input}
              onChange={this.onChange}
              type="text"
              name="shadowColor"
              value={this.state.shadowColor} />
          </div>

        </div>

        <div className={css.code}>
          <pre><code>{JSON.stringify(demoStyle, null, 2)}</code></pre>
        </div>

      </div>

    </div>)
  }
}

