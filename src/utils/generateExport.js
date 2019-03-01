import store from '../state/store'
import immutable from 'object-path-immutable'

function trimWhitespace(text, entities) {
  return entities.map((entity) => {
    let entityText = text.substring(entity.start, entity.end).trim()
    let entityPos = text.indexOf(entityText)
    return {
      start: entityPos,
      end: entityPos + entityText.length,
      value: entity.value,
      entity: entity.entity
    }
  })
}

export default function () {
  const state = store.getState()
  const source = immutable.set(
    state.originalSource,
    'rasa_nlu_data.common_examples',
    state.examples.map(
      ({text, intent, entities}) => ({text, intent, entities: trimWhitespace(text, entities)})
    )
  )
  return JSON.stringify(source, null, 2)
}