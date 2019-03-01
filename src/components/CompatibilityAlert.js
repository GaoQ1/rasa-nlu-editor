// @flow

import React, { Component } from 'react'
import { Modal } from 'antd'
import { connect } from 'react-redux'

const mapState = (state) => ({
  examples: state.examples
})

class CompatibilityAlert extends Component {
  constructor(props) {
    super(props)

    let isChrome = false
    //http://stackoverflow.com/questions/4565112/javascript-how-to-find-out-if-the-user-browser-is-chrome/13348618#13348618
    // please note,
    // that IE11 now returns undefined again for window.chrome
    // and new Opera 30 outputs true for window.chrome
    // and new IE Edge outputs to true now for window.chrome
    // and if not iOS Chrome check
    // so use the below updated condition
    const isChromium = window.chrome
    const winNav = window.navigator
    const vendorName = winNav.vendor
    const isOpera = winNav.userAgent.indexOf('OPR') > -1
    const isIEedge = winNav.userAgent.indexOf('Edge') > -1
    const isIOSChrome = winNav.userAgent.match('CriOS')

    if (isIOSChrome) {
       isChrome = true
    } else if (
      isChromium !== null &&
      isChromium !== undefined &&
      vendorName === 'Google Inc.' &&
      isOpera === false &&
      isIEedge === false
    ) {
       isChrome = true
    }

    this.state = { visible: !isChrome }
  }

  handleClose () {
    this.setState({
      visible: false
    })
  }

  render () {
    return (
      <Modal title='Compatibility Alert' visible={this.state.visible}
        onOk={() => this.handleClose()} onCancel={() => this.handleClose()}
      >
        <div>
          <h4>At the moment, this tool is only tested in Chrome browser. </h4>
          <p>Known issues:</p>
          <ul>
            <li>{` - Intent selection doesn't work in Firefox`}</li>
          </ul>
          <p>You are welcomed to test and file/fix issues in other browsers but for working use please switch to Chrome.</p>
        </div>
      </Modal>
    )
  }
}

export default connect(mapState)(CompatibilityAlert)
