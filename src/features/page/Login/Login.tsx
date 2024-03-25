import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useLogin } from './hooks/useLogin'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { Box } from '@mui/material'

export const Login = () => {
  const { formik } = useLogin()

  const navigate = useNavigate()
  let isLoggedIn = useSelector(selectIsLoggedIn) //не залогинены

  useEffect(() => {
    if (isLoggedIn) navigate('/')
  }, [isLoggedIn])

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel sx={{ textAlign: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', height: '45px' }}>
                <span>Email:</span> <h6>free@samuraijs.com</h6>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px', height: '30px' }}>
                <span>Password:</span> <h6>free</h6>
              </Box>
            </FormLabel>
            <FormGroup>
              <TextField
                label="Email"
                margin="normal"
                autoComplete="email"
                error={!!(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                {...formik.getFieldProps('email')}
              />

              <TextField
                label="Password"
                margin="normal"
                type="password"
                autoComplete="password"
                error={!!(formik.touched.password && formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
                {...formik.getFieldProps('password')}
              />

              <FormControlLabel
                label={'Remember me'}
                control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
                sx={{ marginBottom: '15px' }}
              />

              <Button
                type={'submit'}
                variant={'contained'}
                color={'primary'}
                sx={{ color: 'white', margin: '20px 0' }}
                disabled={formik.isSubmitting || !(formik.dirty && formik.isValid)}>
                Login
              </Button>
            </FormGroup>
          </FormControl>
        </form>
      </Grid>
    </Grid>
  )
}
