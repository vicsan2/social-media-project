import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Formik } from "formik"
import {
  FormControl,
  OutlinedInput,
  FormHelperText,
  TextField,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"

import { postSchema } from "../schemas/misc"
import InputLabel from "../atoms/InputLabel"
import Button from "../atoms/Button"
import Grid from "../atoms/Grid"

function Buttons({
  isSubmitting,
  handleReset,
  setExpanded,
  errors,
  disabled,
  isValid,
  dirty,
}) {
  return (
    <Grid
      container
      rowSpacing={{ xs: 2, md: 0 }}
      columnSpacing={{ xs: 0, md: 2, lg: 4 }}
    >
      <Grid item xs={12} md={6}>
        <Button
          variant="text"
          fullWidth
          type="reset"
          onClick={(e) => {
            handleReset(e)
            setExpanded(false)
          }}
        >
          Cancel
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <LoadingButton
          loading={isSubmitting}
          disabled={disabled || !(isValid && dirty)}
          fullWidth
          type="submit"
          variant="contained"
          {...(!isSubmitting && {
            color: Object.keys(errors).length ? `error` : `primary`,
          })}
        >
          {isSubmitting ? `Loading...` : `Submit Post`}
        </LoadingButton>
      </Grid>
    </Grid>
  )
}

export default function AddPostForm({
  onSubmit,
  isExpanded = false,
  disabled = false,
  setExpanded,
}) {
  return (
    <Formik
      initialValues={{
        title: ``,
        userName: ``,
        content: ``,
      }}
      validationSchema={postSchema}
      onSubmit={onSubmit}
    >
      {({
        errors,
        touched,
        handleSubmit,
        values,
        isSubmitting,
        handleBlur,
        handleChange,
        handleReset,
        isValid,
        dirty,
      }) => (
        <motion.form layout="position" onSubmit={handleSubmit}>
          <InputLabel htmlFor="userName">Username:</InputLabel>
          <FormControl size="small" sx={{ my: 1, width: 1 }}>
            <OutlinedInput
              id="userName"
              error={Boolean(touched.userName && errors.userName)}
              type="text"
              value={values.userName}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby="userName-error"
              autoFocus
              fullWidth
              required
            />
            <FormHelperText id="userName-error">
              {touched.userName && errors.userName}
            </FormHelperText>
          </FormControl>
          <InputLabel htmlFor="title">Title:</InputLabel>
          <FormControl size="small" sx={{ my: 1, width: 1 }}>
            <OutlinedInput
              id="title"
              error={Boolean(touched.title && errors.title)}
              type="text"
              value={values.title}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby="title-error"
              fullWidth
              required
            />
            <FormHelperText id="title-error">
              {touched.title && errors.title}
            </FormHelperText>
          </FormControl>
          <InputLabel htmlFor="content">Message:</InputLabel>
          <FormControl size="small" sx={{ my: 1, width: 1 }}>
            <TextField
              id="content"
              error={Boolean(touched.content && errors.content)}
              type="text"
              value={values.content}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby="content-error"
              multiline
              minRows={1}
              maxRows={4}
              fullWidth
              required
            />
            <FormHelperText id="content-error">
              {touched.content && errors.content}
            </FormHelperText>
          </FormControl>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Buttons
                  isSubmitting={isSubmitting}
                  handleReset={handleReset}
                  setExpanded={setExpanded}
                  errors={errors}
                  disabled={disabled}
                  isValid={isValid}
                  dirty={dirty}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      )}
    </Formik>
  )
}
