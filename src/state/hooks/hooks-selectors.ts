import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatchType, AppRootState, store } from "../storeBLL";

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch