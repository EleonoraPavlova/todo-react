import { initialStateType } from "../app-reducer/app-reducer";

export const appStartState: initialStateType = {
  status: "idle", //without load
  error: null,
  success: null
}