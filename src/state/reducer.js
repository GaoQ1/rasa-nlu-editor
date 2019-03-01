// @flow
import immutable from 'object-path-immutable'
import testData from './testData.json'
import isOnline from '../utils/isOnline'
import pick from 'lodash/pick'

import {
  EDIT,
  DELETE_EXAMPLE,
  SET_SELECTION,
  FETCH_DATA,
  SAVING_DONE,
  EXPAND,
  COLLAPSE,
  OPEN_ADD_MODAL,
  CLOSE_ADD_MODAL,
  SAVE_AND_CLOSE_ADD_MODAL,
  RESET,
} from './actions'

let exampleIDCounter = 0

function createExample({text='', intent='', entities=[]}) {
  return {
    text,
    intent,
    entities,
    updatedAt: Date.now(),
    isExpanded: false,
    id: (++exampleIDCounter).toString(),
  }
}

function prepareExamples(examples = []) {
  return examples.map(example => createExample(example))
}

const INITIAL_STATE = {
  filename: 'testData.json',
  originalSource: isOnline ? testData : null,
  examples: isOnline
    ? testData.rasa_nlu_data.common_examples.map(e => createExample(e))
    : null,
  isUnsaved: false,
  selection: null,
  idExampleInModal: null,
}

export default function reducer (
  state: Object = INITIAL_STATE,
  action: Object
): Object {
  const { type, payload } = action

  function getExampleIndex(_id: string) {
    return state.examples.findIndex(({id}) => id === _id)
  }

  switch (type) {
    case RESET: {
      return {
        ...state,
        examples: [],
        isUnsaved: false,
        selection: null,
        idExampleInModal: null,
      }
    }
    case EDIT: {
      const { id, value } = payload
      const update = pick(value, ['text', 'intent', 'entities'])
      state = immutable.assign(
        state,
        `examples.${getExampleIndex(id)}`,
        { ...update, updatedAt: Date.now() },
      )
      return { ...state, isUnsaved: true }
    }
    case DELETE_EXAMPLE: {
      const { id } = payload
      state = immutable.del(
        state,
        `examples.${getExampleIndex(id)}`,
      )
      return { ...state, isUnsaved: true }
    }
    case SET_SELECTION: {
      const { id, start, end } = payload
      if (start === end) {
        return state
      }
      return immutable.set(state, `selection`, { idExample: id, start, end })
    }
    case FETCH_DATA: {
      const { data, path } = payload
      return {
        ...state,
        examples: prepareExamples(data.rasa_nlu_data.common_examples),
        originalSource: data,
        filename: path,
      }
    }
    case SAVING_DONE: {
      return {
        ...state,
        isUnsaved: false,
      }
    }
    case EXPAND: {
      const { id } = payload

      return immutable.set(
        state,
        `examples.${getExampleIndex(id)}.isExpanded`,
        true,
      )
    }
    case COLLAPSE: {
      const { id } = payload

      return immutable.set(
        state,
        `examples.${getExampleIndex(id)}.isExpanded`,
        false,
      )
    }

    case OPEN_ADD_MODAL: {
      const example = createExample({})
      state = immutable.push(
        state,
        `examples`,
        example,
      )
      return immutable.set(state, `idExampleInModal`, example.id)
    }
    case CLOSE_ADD_MODAL: {
      state = immutable.del(
        state,
        `examples.${getExampleIndex(state.idExampleInModal)}`,
      )
      return immutable.set(state, `idExampleInModal`, null)
    }
    case SAVE_AND_CLOSE_ADD_MODAL: {
      return immutable.set(state, `idExampleInModal`, null)
    }
    default:
      return state
  }
}
