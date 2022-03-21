import * as React from "react"
import { useQuery } from "react-query"
import { motion } from "framer-motion"
import axios from "axios"
import Post from "../organisms/Post"
import DefaultPost from "../organisms/DefaultPost"
import AddPost from "../organisms/AddPost"
import { apiUrl } from "../constants"
import { PostProvider } from "../contexts/Post"
import Box from "../atoms/Box"
import AddUser from "../organisms/AddUser"

// Get all posts from worker and see organize them correctly. If there are no posts, create a default post that states so.
export default function Posts() {
  const [user, setUser] = React.useState(`Fetching Username...`)

  const { isLoading, data, error } = useQuery(`getPosts`, () =>
    fetch(`${apiUrl}/posts`)
      .then((res) => res.json())
      .then(({ data: apiData, ...allData }) => ({
        allPosts: apiData,
        ...allData,
      }))
  )

  axios.get(`https://intro-six-opt-framing.trycloudflare.com/verify`).then(
    (res) => {
      setUser(res.data)
    },
    () => {
      setUser(``)
    }
  )

  const posts = data?.allPosts?.slice(0, 5)

  if (isLoading) return <DefaultPost message="Loading..." />

  if (error) return <DefaultPost message={`An error has occurred: ${error}`} />

  return (
    <Box sx={{ maxWidth: 640, margin: `10px auto` }}>
      <motion.div layout>
        {user.length > 0 ? <AddPost user={user} /> : <AddUser />}
      </motion.div>
      {/* AddPost always displays, then if there are no posts, return default. Otherwise display each post */}
      {!posts?.length && <DefaultPost message={data?.message} />}
      {posts?.map((postData) => (
        <PostProvider>
          <motion.div layout>
            <Post key={postData.id} {...postData} />
          </motion.div>
        </PostProvider>
      ))}
    </Box>
  )
}
