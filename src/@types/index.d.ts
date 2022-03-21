interface PostData {
  title: string
  userName: string
  content: string
  id?: number
}

interface AllPosts {
  allPosts: Post[]
}

interface CommentData {
  comment: string
}

interface AllComments {
  allComments: Comment[]
}

type LikeSelected = 0 | 1

interface AllLikes {
  allLikesCount: LikeSelected
}

interface Provider {
  showComments: boolean = false
  handleCommentClick: (e: any) => void
}

interface UserData {
  user: string
}
