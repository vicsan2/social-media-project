import * as React from "react"
import { useQueryClient } from "react-query"

const PostContext = React.createContext({})

export const usePost = () => {
  const ctx: Provider | any = React.useContext(PostContext)

  if (!ctx) {
    throw new Error(`Cannot use post context outside of the provider.`)
  }

  return ctx
}

// Separating some of the logic in a context provider. Button reveals comments when pressed
export function PostProvider({ children }) {
  const queryClient = useQueryClient()
  const [showComments, setShowComments] = React.useState(false)
  const handleCommentClick = (e) => {
    e.preventDefault()
    queryClient.invalidateQueries(`getPosts`)
    setShowComments((prevState) => !prevState)
  }

  const values = React.useMemo(
    () => ({ showComments, handleCommentClick }),
    [showComments]
  )

  return <PostContext.Provider value={values}>{children}</PostContext.Provider>
}
