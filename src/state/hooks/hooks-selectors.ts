import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatchType, AppRootState } from "../storeBLL";

//export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector