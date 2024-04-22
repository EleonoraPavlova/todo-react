import React from 'react'
import { useAppDispatch } from 'common/hooks'
import { handleServerNetworkError } from 'common/utils'
import { useFormik } from 'formik'
import { authThunks } from 'BLL/reducers/authSlice'
import { FieldError, LoginParams } from 'common/types'

export type ApiConfig = {
  errors: string[]
  fieldsErrors: FieldError[]
}

export function useLogin() {
  const dispatch = useAppDispatch()

  const formik = useFormik({
    validate: (values) => {
      const errors: Partial<LoginParams> = {}

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 4) {
        errors.password = 'Must be more 4 symbols'
      }

      return errors
    },

    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    onSubmit: (values, { setFieldError, setSubmitting }) => {
      setSubmitting(true)
      try {
        dispatch(authThunks.loginTC(values))
          .unwrap()
          .then((res) => {
            console.log('res', res)
          })
          .catch((e: ApiConfig) => {
            setFieldError('email', e.errors[0])
            setFieldError('password', e.errors[0])
          })
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      }
      setSubmitting(false)
    },
  })

  return { formik }
}
