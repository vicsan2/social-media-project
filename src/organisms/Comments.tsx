import * as React from "react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "react-query"
import { Formik } from "formik"
import axios, { AxiosError } from "axios"
import { AnimatePresence, motion } from "framer-motion"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import LoadingButton from "@mui/lab/LoadingButton"
import Comment from "./Comment"
import { apiUrl } from "../constants"
import { commentSchema } from "../schemas/misc"

import CircularProgress from "../atoms/CircularProgress"
import Box from "../atoms/Box"
import InputLabel from "../atoms/InputLabel"
import Grid from "../atoms/Grid"
import Button from "../atoms/Button"

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

// Requst adding of new comment to the kv namespace.
// If successful, display comment to user before refreshing
// all comments on this post ID
function CommentForm({ id }) {
  const queryClient = useQueryClient()
  const [isExpanded, setExpanded] = React.useState(false)

  const commentMutation: UseMutationResult<
    CommentData,
    AxiosError,
    CommentData
  > = useMutation<CommentData, AxiosError, CommentData>(
    async (newComment: CommentData) => {
      const { user } = await queryClient.getQueryData<UserData>(`verifyUser`)
      return axios.post(
        `${apiUrl}/comments/${id}`,
        JSON.stringify({ userName: user, ...newComment }),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
    },
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(`getComments/${id}`)
        const previousComments: AllComments = queryClient.getQueryData(
          `getComments/${id}`
        )
        if (!previousComments.allComments) {
          previousComments.allComments = []
        }
        const { user } = await queryClient.getQueryData<UserData>(`verifyUser`)
        queryClient.setQueryData(`getComments/${id}`, {
          allComments: [
            ...previousComments.allComments,
            { userName: user, ...newComment },
          ],
          code: 200,
          message: `success`,
        })
        return { previousComments }
      },
      onSuccess: () => {
        setTimeout(
          () => queryClient.invalidateQueries(`getComments/${id}`),
          500
        )
      },
    }
  )
  const { error } = commentMutation

  return (
    <Formik
      initialValues={{
        comment: ``,
      }}
      validationSchema={commentSchema}
      onSubmit={(values) => commentMutation.mutateAsync(values)}
    >
      {({
        errors,
        touched,
        handleSubmit,
        handleBlur,
        handleChange,
        values,
        isSubmitting,
        handleReset,
        isValid,
        dirty,
      }) => (
        <motion.form
          onClick={() => setExpanded(true)}
          layout="position"
          onSubmit={handleSubmit}
        >
          <InputLabel htmlFor="comment">Comment:</InputLabel>
          <FormControl size="small" sx={{ my: 1, width: 1 }}>
            <TextField
              id="comment"
              error={Boolean(touched.comment && errors.comment)}
              type="text"
              value={values.comment}
              onBlur={handleBlur}
              onChange={handleChange}
              aria-describedby="comment-error"
              multiline
              minRows={1}
              maxRows={3}
              fullWidth
              required
            />
            <FormHelperText id="comment-error">
              {touched.comment && errors.comment}
            </FormHelperText>
          </FormControl>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <FormHelperText id="submit-error">
                  {error && error.message}
                </FormHelperText>
                <Buttons
                  isSubmitting={isSubmitting}
                  handleReset={handleReset}
                  setExpanded={setExpanded}
                  errors={errors}
                  disabled={false}
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

interface MessageProps {
  message: string
}

function Message({ message }: MessageProps) {
  return (
    <Box
      sx={{
        marginTop: 10,
        borderBottom: `1px solid black`,
        paddingBottom: 10,
        textAlign: `center`,
        display: `flex`,
      }}
    >
      {message}
    </Box>
  )
}

function LoadingMessage() {
  return (
    <Box>
      <CircularProgress />
    </Box>
  )
}

export default function Comments({ id }) {
  const { isLoading, data, error } = useQuery(`getComments/${id}`, () =>
    fetch(`${apiUrl}/comments/${id}`)
      .then((res) => res.json())
      .then(({ data: apiData, ...allData }) => ({
        allComments: apiData,
        ...allData,
      }))
  )

  if (isLoading) return <LoadingMessage />

  if (error) return <Message message={`An error has occurred: ${error}`} />

  return (
    <Box>
      {data?.allComments?.map((commentData) => (
        <Comment key={commentData.comment} data={commentData} />
      ))}
      <CommentForm id={id} />
    </Box>
  )
}
