import { CircularProgress, createTheme, styled } from '@mui/material'
import { blue, purple } from '@mui/material/colors'
import { appThunks, selectAppInitialized } from 'BLL/reducers/appSlice'
import { useActions } from 'common/hooks'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function useApp() {
  const { setAppInitializeTC } = useActions(appThunks)
  let initialized = useSelector(selectAppInitialized) //first initialization

  let [lightMode, setLightMode] = useState<boolean>(true)
  let btnText = lightMode ? 'dark' : 'light'
  const themeHandler = createTheme({
    palette: {
      primary: blue,
      secondary: purple,
      mode: lightMode ? 'light' : 'dark',
    },
  })

  const toggleTheme = () => {
    setLightMode(!lightMode)
  }

  const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
    '& circle': {
      strokeWidth: 2,
    },
  }))

  useEffect(() => {
    //download all todolists from api when loading the component
    if (!initialized) {
      setAppInitializeTC()
    }
  }, [])

  return { lightMode, themeHandler, btnText, CustomCircularProgress, toggleTheme }
}
