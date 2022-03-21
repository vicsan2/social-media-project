import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Formik } from "formik"
import { FormControl, OutlinedInput, FormHelperText } from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

import { userSchema } from "../schemas/misc"
import InputLabel from "../atoms/InputLabel"

export default function AddUserForm({ onSubmit, error }) {
  return (
    <Formik
      initialValues={{
        user: ``,
      }}
      validationSchema={userSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        handleSubmit,
        values,
        handleBlur,
        handleChange,
        isSubmitting,
      }) => (
        <motion.form layout="position" onSubmit={handleSubmit}>
          <AnimatePresence>
            <InputLabel htmlFor="user">Username:</InputLabel>
            <FormControl size="small" sx={{ my: 1, width: 1 }}>
              <OutlinedInput
                id="user"
                error={Boolean(touched.user && errors.user)}
                type="text"
                value={values.user}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-describedby="user-error"
                autoFocus
                fullWidth
                required
              />
              <FormHelperText id="user-error">
                {error && error.message}
              </FormHelperText>
            </FormControl>
            <FormHelperText id="submit-error">{error}</FormHelperText>
            <LoadingButton
              loading={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
              {...(!isSubmitting && {
                color: Object.keys(errors).length ? `error` : `primary`,
              })}
            >
              {isSubmitting ? `Loading...` : `Create User`}
            </LoadingButton>
          </AnimatePresence>
        </motion.form>
      )}
    </Formik>
  )
}
