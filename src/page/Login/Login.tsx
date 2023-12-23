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

export const Login = () => {

  const formik = useFormik({
    validate: (values) => {
      if (!values.email) {
        return {
          email: "Email is required"
        }
      }
      if (!values.password) {
        return {
          password: "Password is required"
        }
      }
    },

    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    onSubmit: values => {
      alert(JSON.stringify(values));
    },
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
            <TextField label="Email" margin="normal"
              {...formik.getFieldProps("email")} />
            {formik.errors.email && formik.touched.email && formik.errors.email}
            <TextField type="password" label="Password"
              margin="normal"
              {...formik.getFieldProps("password")}
            />
            {formik.errors.password && formik.touched.email && formik.errors.password}
            <FormControlLabel label={'Remember me'}
              control={<Checkbox  {...formik.getFieldProps("Remember me")}
                checked={formik.values.rememberMe}
              />}
              sx={{ marginBottom: "15px" }} />
            <Button type={'submit'} variant={'contained'} color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </FormControl>
      </form>
    </Grid>
  </Grid >
}