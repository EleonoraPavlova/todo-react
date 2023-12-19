import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { AppAllActionsType, AppRootState } from "../storeBLL";


type DispatchFunc = () => AppAllActionsType
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector