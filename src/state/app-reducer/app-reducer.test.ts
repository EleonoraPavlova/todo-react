import { appReducer, initialStateType, setErrorAC, setStatusAC } from "./app-reducer"

let startState: initialStateType

beforeEach(() => {
  startState = {
    status: "idle",
    error: null
  }
})


test('correct error message should be set', () => {
  const endState = appReducer(startState, setErrorAC("Some error"))

  expect(endState.error).toBe("Some error")
  expect(startState.error).toBe(null)
})


test('correct status message should be set', () => {
  const endState = appReducer(startState, setStatusAC("succeeded"))

  expect(endState.status).toBe("succeeded")
})