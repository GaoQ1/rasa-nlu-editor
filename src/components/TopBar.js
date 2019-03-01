// @flow

import React, { Component } from 'react';
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import * as actions from '../state/actions'
import isOnline from '../utils/isOnline'
import ClearButton from './ClearButton'
import FileReaderInput from 'react-file-reader-input'
import { saveAs } from 'file-saver'
import generateExport from '../utils/generateExport'

const mapState = (state) => ({
  filename: state.filename || 'loading...',
  isUnsaved: state.isUnsaved,
  examples: state.examples,
})

const mapActions = dispatch => ({
  save: (examples) => {
    dispatch(actions.save(examples))
  },
  openAddModal: () => {
    dispatch(actions.openAddModal())
  },
  fetchData: (path, data) => {
    dispatch(actions.fetchData(path, data))
  },
})

const styles = {
  button: {
    height: 28,
    marginTop: 2,
    marginRight: 8,
  }
}

class TopBar extends Component {
  handleFileInputChange(_, results) {
    const [e, file] = results[0]
    let data
    try {
      data = JSON.parse(e.target.result)
    }
    catch (e) {
      return alert('Can\'t JSON parse the selected file :(')
    }
    data.rasa_nlu_data = data.rasa_nlu_data || {}
    data.rasa_nlu_data.common_examples = data.rasa_nlu_data.common_examples || []
    this.props.fetchData(file.name, data)
  }
  render() {
    const { filename, isUnsaved, save, openAddModal } = this.props

    const fileButtons = isOnline
      ? (
        <div style={{display: 'flex'}}>
          <FileReaderInput
            as='text'
            onChange={(e, results) => this.handleFileInputChange(e, results)}
            >
            <Button type='ghost' style={styles.button}>
              <Icon type='upload' /> Click to Upload
            </Button>
          </FileReaderInput>
          <Button
            type={isUnsaved ? 'primary' : 'ghost'}
            style={styles.button}
            onClick={() => {
              var blob = new Blob(
                [ generateExport() ],
                { type: 'text/plain;charset=utf-8' },
              )
              debugger
              saveAs(blob, filename)
            }}
          >
            <Icon type='download' /> Download
          </Button>
        </div>
      )
      : (
        <Button
          style={ styles.button }
          type={isUnsaved ? 'primary' : 'default'}
          onClick={() => save(generateExport())}
        >
          Save
        </Button>
      )

    return (
      <div style={{ height: 32, display: 'flex' }}>
        <h3 style={{ marginLeft: 8, marginTop: 5 }}>
          {filename}
        </h3>
        <div style={{flex: 1}} />
        <Button
          style={ styles.button }
          type='primary'
          onClick={() => openAddModal()}
        >
          Add new example
        </Button>
        {fileButtons}
        <ClearButton style={ styles.button }/>
      </div>
    )
  }
}

export default connect(mapState, mapActions)(TopBar)
