import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatchType, AppRootState } from "../storeBLL";


// type DispatchFunc = () => AppThunkType
// export const useAppDispatch: DispatchFunc = useDispatch()
//export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector