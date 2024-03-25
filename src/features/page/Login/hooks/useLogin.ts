import React from 'react'
import { useAppDispatch } from 'common/hooks'
import { handleServerNetworkError } from 'common/utils'
import { useFormik } from 'formik'
import { loginTC } from 'BLL/reducers/authSlice'
import { LoginParams } from 'common/types'

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
        errors.password = 'Must be more 5 symbols'
      }

      return errors
    },

    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },

    onSubmit: async (values, { setFieldValue, setSubmitting }) => {
      setSubmitting(true)
      try {
        await dispatch(loginTC(values))
        setFieldValue('password', '')
        // if (loginTC.rejected.match(res)) {
        //   if (res.payload?.fieldsErrors?.length) {
        //     const error = res.payload?.fieldsErrors[0]
        //     setFieldValue("password", "")
        //     // setFieldValue(error.field, error.error)
        //   }
        // }
      } catch (e) {
        handleServerNetworkError(e, dispatch)
      }
      setSubmitting(false)
    },
  })

  return { formik }
}
