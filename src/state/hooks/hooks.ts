import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { AppDispatch, AppRootState } from '../../app/storeBLL'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector

// export type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch

// export function useActions<T extends ActionCreatorsMapObject<any>>(actions: T) {
//   const dispatch = useAppDispatch()

//   const boundActions = useMemo(() => {
//     return bindActionCreators(actions, dispatch)
//   }, [])

//   return boundActions
// }
