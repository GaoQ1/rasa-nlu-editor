// @flow

import React, { Component } from 'react';
import { Button, Popover } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'

const mapActions = dispatch => ({
  reset: () => {
    dispatch(actions.reset())
  },
})

class ClearButton extends Component {
  state: Object;
  constructor(props) {
    super(props)

    this.state = {
      open: false,
    }
  }
  render() {
    const { reset, style } = this.props

    return (
      <Popover
        placement='bottomRight'
        title={'Do you want to clear all the examples?'}
        visible={this.state.open}
        onVisibleChange={open => this.setState({open})}
        content={
          <Button
            onClick={() => {
              reset()
              this.setState({open: false})
            }}
          >
            Yes
          </Button>
        }
        trigger='click'
      >
        <Button style={ style }>
          Clear
        </Button>
      </Popover>
    )
  }
}

export default connect(null, mapActions)(ClearButton)
