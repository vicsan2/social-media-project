import * as React from "react"
import { motion } from "framer-motion"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"

import { apiUrl } from "../constants"
import Typography from "../atoms/Typography"
import AddPostForm from "../molecules/AddPostForm"
import PostWrapper from "../molecules/PostWrapper"

function QueryMutation(): UseMutationResult<PostData, AxiosError, PostData> {
  const queryClient = useQueryClient()
  return useMutation<PostData, AxiosError, PostData>(
    async (newPost: PostData) =>
      axios.post(`${apiUrl}/posts`, JSON.stringify(newPost), {
        headers: {
          "Content-Type": `application/json`,
        },
      }),
    // post(`${apiUrl}/users`, JSON.stringify(newPost.userName), {
    //   headers: {
    //     "Content-Type": `application/json`,
    //   },
    // })
    {
      // onMutate: async (newPost: PostData) => {
      //   await queryClient.cancelQueries(`getPosts`)
      //   const previousPosts: AllPosts = queryClient.getQueryData(`getPosts`)
      //   if (!previousPosts.allPosts) {
      //     previousPosts.allPosts = []
      //   }
      //   queryClient.setQueryData(`getPosts`, {
      //     allPosts: [
      //       ...previousPosts.allPosts,
      //       { ...newPost, id: previousPosts.allPosts.length },
      //     ],
      //     code: 200,
      //     message: `success`,
      //   })
      //   return { previousPosts }
      // },
      onSuccess: () => {
        setTimeout(() => queryClient.invalidateQueries(`getPosts`), 500)
      },
    }
  )
}

// Requst adding of new post to the kv namespace.
// If successful, display post to user before refreshing all posts
export default function AddPost({
  disabled = false,
  expanded = false,
  user = ``,
}) {
  const postMutation = QueryMutation()

  const { error } = postMutation

  const [isExpanded, setExpanded] = React.useState(expanded)

  return (
    <motion.div layout>
      <PostWrapper onClick={() => setExpanded(true)}>
        <Typography variant="h3" sx={{ textAlign: `center` }}>
          Create Post
        </Typography>
        <AddPostForm
          onSubmit={(values: PostData) => {
            const parsedUserName = values.userName.trim()
            // When submited, attempt to send new post
            return postMutation.mutateAsync({
              ...values,
              userName: !parsedUserName.length ? `Anonymous` : parsedUserName,
            })
          }}
          disabled={disabled}
          isExpanded={isExpanded}
          setExpanded={setExpanded}
          user={user}
          error={error}
        />
      </PostWrapper>
    </motion.div>
  )
}
