// @flow

import React, { Component } from 'react'
import ExampleTable from './ExampleTable'
import TopBar from './TopBar'
import AddExampleModal from './AddExampleModal'
import CompatibilityAlert from './CompatibilityAlert'
import { connect } from 'react-redux'
import { Spin } from 'antd'

const mapState = (state) => ({
  examples: state.examples
})

class App extends Component {
  render() {
    const { examples } = this.props
    if (!examples) {
      return (
        <Spin style={{ width: '100%', height: '100%' }}>
          <div />
        </Spin>
      )
    }

    const intents = []
    examples.forEach(({intent}) => {
      if (intent && intents.indexOf(intent) === -1) {
        intents.push(intent)
      }
    })

    const entityNames = []
    examples.forEach((example) => {
      example.entities.forEach(({entity}) => {
        if (entity && entityNames.indexOf(entity) === -1) {
          entityNames.push(entity)
        }
      })
    })

    return (
      <div>
        <ExampleTable
          intents={intents}
          entityNames={entityNames}
          header={() => <TopBar />}
        />
        <AddExampleModal
          intents={intents}
          entityNames={entityNames}
        />
        <CompatibilityAlert />
      </div>
    )
  }
}

export default connect(mapState)(App)
