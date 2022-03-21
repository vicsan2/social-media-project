import * as React from "react"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import Post from "../organisms/Post"
import DefaultPost from "../organisms/DefaultPost"
import { apiUrl } from "../constants"
import { PostProvider } from "../contexts/Post"

// Get all posts from worker and see organize them correctly. If there are no posts, create a default post that states so.
export default function Posts() {
  const { isLoading, data, error } = useQuery(`getPosts`, () =>
    fetch(`${apiUrl}/posts`)
      .then((res) => res.json())
      .then(({ data: apiData, ...allData }) => ({
        allPosts: apiData,
        ...allData,
      }))
  )

  const posts = data?.allPosts?.slice(0, 5)

  if (isLoading) return <DefaultPost message="Loading..." />

  if (error) return <DefaultPost message={`An error has occurred: ${error}`} />

  return (
    <>
      {/* AddPost always displays, then if there are no posts, return default. Otherwise display each post */}
      {!posts?.length && <DefaultPost message={data?.message} />}
      {posts?.map((postData) => (
        <PostProvider>
          <motion.div layout>
            <Post key={postData.id} {...postData} />
          </motion.div>
        </PostProvider>
      ))}
    </>
  )
}
