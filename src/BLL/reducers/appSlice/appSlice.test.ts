import { RequestStatus } from 'common/types'
import { appReducer, setAppErrorAC } from './appSlice'

type initialStateType = {
  status: RequestStatus
  error: string | null
  success: string | null
  initialized: boolean
}

let startState: initialStateType

beforeEach(() => {
  startState = {
    status: 'idle',
    error: null,
    success: null,
    initialized: false,
  }
})

test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC({ error: 'Some error' }))

  expect(endState.error).toBe('Some error')
  expect(startState.error).toBe(null)
})

// test('correct status message should be set', () => {
//   const endState = appReducer(startState, setAppStatusAC({ status: 'succeeded' }))

//   expect(endState.status).toBe('succeeded')
// })
