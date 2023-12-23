import { appReducer, initialStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer"

let startState: initialStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: null,
    success: null,
    initialized: false
  }
})


test('correct error message should be set', () => {
  const endState = appReducer(startState, setAppErrorAC("Some error"))

  expect(endState.error).toBe("Some error")
  expect(startState.error).toBe(null)
})


test('correct status message should be set', () => {
  const endState = appReducer(startState, setAppStatusAC("succeeded"))

  expect(endState.status).toBe("succeeded")
})