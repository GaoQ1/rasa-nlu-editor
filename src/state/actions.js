// @flow
const ROOT_PATH = process.env.NODE_ENV === 'production'
  ? '/'
  : 'http://localhost:4321/'

export const RESET = 'RESET'
export const reset = (): Object => ({
  type: RESET,
})

export const EDIT = 'EDIT'
export const edit = (id: string, value: Object): Object => ({
  type: EDIT,
  payload: { id, value }
})

export const DELETE_EXAMPLE = 'DELETE_EXAMPLE'
export const deleteExample = (id: string): Object => ({
  type: DELETE_EXAMPLE,
  payload: { id }
})

export const SET_SELECTION = 'SET_SELECTION'
export const setSelection = (
  id: string,
  start: number,
  end: number,
): Object => ({
  type: SET_SELECTION,
  payload: { id, start, end }
})

export const FETCH_DATA = 'FETCH_DATA'
export const fetchData = (
  path: string,
  data: Object,
): Object => ({
  type: FETCH_DATA,
  payload: { path, data }
})
export const loadData = () => async (dispatch: Function): Promise<void> => {
  const response: Object = await fetch(`${ROOT_PATH}data`, {
    method: 'POST',
  })
  const json = await response.json()
  dispatch(fetchData(json.path, json.data))
}

export const SAVING_DONE = 'SAVING_DONE'
export const save = (source: string): Function =>  async (
  dispatch: Function
): Promise<void> => {
  const response = await fetch(`${ROOT_PATH}save`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: source,
  })
  //TODO add progressing feedback
  const json = await response.json()
  if (json.ok) {
    dispatch({
      type: SAVING_DONE,
    })
  }
}

export const EXPAND = 'EXPAND'
export const expand = (id: string): Object => ({
  type: EXPAND,
  payload: { id }
})

export const COLLAPSE = 'COLLAPSE'
export const collapse = (id: string): Object => ({
  type: COLLAPSE,
  payload: { id }
})

export const OPEN_ADD_MODAL = 'OPEN_ADD_MODAL'
export const openAddModal = (): Object => ({
  type: OPEN_ADD_MODAL,
})
export const CLOSE_ADD_MODAL = 'CLOSE_ADD_MODAL'
export const closeAddModal = (): Object => ({
  type: CLOSE_ADD_MODAL,
})
export const SAVE_AND_CLOSE_ADD_MODAL = 'SAVE_AND_CLOSE_ADD_MODAL'
export const saveAndCloseAddModal = (): Object => ({
  type: SAVE_AND_CLOSE_ADD_MODAL,
})
