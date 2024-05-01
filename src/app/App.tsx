import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectAppInitialized } from 'BLL/reducers/appSlice'
import { SnackBar } from 'components/SnackBar'
import { useApp } from './hooks/useApp'
import { Appbar } from 'components/Appbar/Appbar'
import { RoutesComponent } from 'features/routers/RoutesComponent'

type Props = {
  demo?: boolean //download moc state
}

export const App: React.FC<Props> = ({ demo = false }) => {
  let initialized = useSelector(selectAppInitialized) //first initialization

  const { lightMode, themeHandler, btnText, CustomCircularProgress, toggleTheme } = useApp()

  if (!initialized) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CustomCircularProgress />
      </Box>
    )
  }

  return (
    <ThemeProvider theme={themeHandler}>
      <Appbar btnText={btnText} toggleTheme={toggleTheme} />
      <Box sx={{ margin: '0 60px' }}>
        <RoutesComponent lightMode={lightMode} />
      </Box>
      <SnackBar />
    </ThemeProvider>
  )
}
export default App
