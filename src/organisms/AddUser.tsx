import * as React from "react"
import { motion } from "framer-motion"
import { useMutation, UseMutationResult, useQueryClient } from "react-query"
import axios, { AxiosError } from "axios"

import { apiUrl } from "../constants"
import Typography from "../atoms/Typography"
import PostWrapper from "../molecules/PostWrapper"
import AddUserForm from "../molecules/AddUserForm"

function QueryMutation(): UseMutationResult<UserData, AxiosError, UserData> {
  const queryClient = useQueryClient()
  return useMutation<UserData, AxiosError, UserData>(
    async (newUser: UserData) =>
      axios.post(`${apiUrl}/users`, JSON.stringify(newUser.user), {
        headers: {
          "Content-Type": `application/json`,
          "Access-Control-Expose-Headers": `Set-Cookie`,
        },
        withCredentials: true,
      }),
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
export default function AddUser() {
  const postMutation = QueryMutation()

  const { error } = postMutation

  return (
    <motion.div layout>
      <PostWrapper>
        <Typography variant="h3" sx={{ textAlign: `center` }}>
          Choose A Temporary Username
        </Typography>
        <AddUserForm
          onSubmit={(values: UserData) => {
            const parsedUserName = values.user.trim()
            // When submited, attempt to send new post
            return postMutation.mutateAsync({
              ...values,
              user: !parsedUserName.length ? `Anonymous` : parsedUserName,
            })
          }}
          error={error}
        />
      </PostWrapper>
    </motion.div>
  )
}
