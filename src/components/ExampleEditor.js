// @flow

import React, { Component, PropTypes } from 'react';
import { Button } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'
import EntityTable from './EntityTable'

const mapActions = dispatch => ({
  deleteExample: (idExample) => {
    dispatch(actions.deleteExample(idExample))
  },
})

class ExampleEditor extends Component {
  render() {
    const { example, deleteExample, entityNames } = this.props

    return (
      <div>
        <EntityTable example={example} entityNames={entityNames} />
        <Button
          style={{ float: 'right' }}
          onClick={() => deleteExample(example.id)}
        >
          Delete example
        </Button>
      </div>
    )
  }
}

ExampleEditor.propTypes = {
  example: PropTypes.shape({
    text: PropTypes.string.isRequired,
    intent: PropTypes.string.isRequired,
    entities: PropTypes.arrayOf(PropTypes.shape({
      start: PropTypes.number.isRequired,
      end: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      entity: PropTypes.string.isRequired,
    })),
  })
}

export default connect(null, mapActions)(ExampleEditor)
