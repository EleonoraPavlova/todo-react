import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from "formik";
import { useAppDispatch } from "../../state/hooks/hooks-selectors";
import { loginTC } from "../../state/auth-reducers/auth-reducer";
import { LoginParamsTypeApi } from "../../api_DAL/login-api";
import { handleServerNetworkError } from "../../utils/error-utils";

export const Login = () => {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    validate: (values) => {
      const errors: Partial<LoginParamsTypeApi> = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 5) {
        errors.password = 'Must be more 5 symbols';
      }

      return errors
    },

    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: async (values, { setFieldValue, setSubmitting }) => {
      setSubmitting(true)
      try {
        const res = await dispatch(loginTC(values))
        if (loginTC.rejected.match(res)) {
          if (res.payload?.fieldsError?.length) {
            const error = res.payload?.fieldsError[0]
            // setFieldValue("password", "")
            setFieldValue(error.field, error.error)
          } else {

          }
        }
      } catch (err) {
        handleServerNetworkError(err as { message: string }, dispatch)
      }
      setSubmitting(false)
    }
  })


  //  {...formik.getFieldProps("email")} /> взяла все пропсы которые есть у formik c крнкретным именем email
  return <Grid container justifyContent={'center'}>
    <Grid item justifyContent={'center'}>
      <form onSubmit={formik.handleSubmit}>
        <FormControl>
          <FormLabel sx={{ textAlign: "center" }}>
            <h4>To log in get registered</h4>
          </FormLabel>
          <FormGroup>

            <TextField label="Email"
              margin="normal"
              autoComplete="email"
              error={!!(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              {...formik.getFieldProps("email")}
            />

            <TextField label="Password"
              margin="normal"
              type="password"
              autoComplete="password"
              error={!!(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              {...formik.getFieldProps("password")}
            />

            <FormControlLabel label={'Remember me'}
              control={<Checkbox  {...formik.getFieldProps("rememberMe")}
                checked={formik.values.rememberMe}
              />}
              sx={{ marginBottom: "15px" }} />

            <Button type={'submit'}
              variant={'contained'}
              color={'primary'}
              sx={{ color: 'white', margin: "20px 0" }}
              disabled={
                formik.isSubmitting ||
                !(formik.dirty && formik.isValid)
              }
            >Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid >
}