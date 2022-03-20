import * as React from "react"
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "react-query"
import { Formik, Form, Field } from "formik"
import axios, { AxiosError } from "axios"
import Comment from "./Comment"
import { apiUrl } from "../constants"
import { commentSchema } from "../schemas/misc"
import CircularProgress from "../atoms/CircularProgress"
import Box from "../atoms/Box"

// Requst adding of new comment to the kv namespace.
// If successful, display comment to user before refreshing
// all comments on this post ID
function CommentForm({ id }) {
  const queryClient = useQueryClient()
  const commentMutation: UseMutationResult<
    CommentData,
    AxiosError,
    CommentData
  > = useMutation<CommentData, AxiosError, CommentData>(
    async (newComment: CommentData) =>
      axios.post(`${apiUrl}/comments/${id}`, JSON.stringify(newComment), {
        headers: {
          "Content-Type": `application/json`,
        },
      }),
    // const xhr = new XMLHttpRequest()
    // xhr.open(`POST`, `${apiUrl}/comments/${id}`)
    // xhr.setRequestHeader(`content-type`, `application/json`)
    // return xhr.send(JSON.stringify(newComment))
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(`getComments/${id}`)
        const previousComments: AllComments = queryClient.getQueryData(
          `getComments/${id}`
        )
        if (!previousComments.allComments) {
          previousComments.allComments = []
        }
        queryClient.setQueryData(`getComments/${id}`, {
          allComments: [...previousComments.allComments, newComment],
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

  return (
    <Formik
      initialValues={{
        userName: ``,
        comment: ``,
      }}
      validationSchema={commentSchema}
      onSubmit={(values) => {
        const parsedUserName = values.userName.trim()
        commentMutation.mutate({
          ...values,
          userName: !parsedUserName.length ? `Anonymous` : parsedUserName,
        })
      }}
    >
      {({ errors, touched }) => (
        <Form id="comment">
          <div style={{ paddingTop: 10 }}>
            Username: <Field name="userName" />
            {errors.userName && touched.userName ? (
              <div>{errors.userName}</div>
            ) : null}
          </div>
          <p>Comment:</p>
          <Field
            name="comment"
            component="textarea"
            rows="5"
            cols="41"
            style={{ resize: `none` }}
          />
          {errors.comment && touched.comment ? (
            <div>{errors.comment}</div>
          ) : null}
          <div style={{ marginTop: 10, textAlign: `right` }}>
            <button type="submit">Submit</button>
          </div>
        </Form>
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
