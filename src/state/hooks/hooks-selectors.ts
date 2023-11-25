import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppDispatchType, AppRootState } from "../storeBLL";


type DispatchFunc = () => AppDispatchType
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector