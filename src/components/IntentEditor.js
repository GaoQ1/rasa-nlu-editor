// @flow

import React, { Component } from 'react';
import { AutoComplete } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'

const mapActions = dispatch => ({
  edit: (idExample, update) => {
    dispatch(actions.edit(idExample, update))
  },
})

class IntentEditor extends Component {
  handleIntentChange(intent: string) {
    const { edit, example } = this.props

    edit(example.id, {
      intent,
    })
  }

  render() {
    const { example, intents, style } = this.props

    return (
      <AutoComplete
        dataSource={intents}
        style={{ width: 230, ...style }}
        value={example.intent}
        onSelect={value => this.handleIntentChange(value)}
        onChange={value => this.handleIntentChange(value)}
        placeholder='intent'
      />
    )
  }
}

export default connect(null, mapActions)(IntentEditor)
