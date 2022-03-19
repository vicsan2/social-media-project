/* eslint-disable react/jsx-no-useless-fragment */
import axios, { AxiosError } from "axios"
import * as React from "react"
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query"
import { apiUrl } from "../constants"

const allLikes = [`👍`, `👎`]

function Like({ id }) {
  return id
}

// Display current like count of each post to user, and allow them to like/dislike a post
export function Likes({ id }) {
  const queryClient = useQueryClient()
  // Defaults state of like/dislike is an array of two booleans, both false
  const [likeSelected, setSelectedLike] = React.useState(
    new Array(allLikes.length).fill(false)
  )

  const likeMutation: UseMutationResult<
    LikeSelected,
    AxiosError,
    LikeSelected
  > = useMutation<LikeSelected, AxiosError, LikeSelected>(
    async (newLikeSelected: LikeSelected) => {
      //  Create new editable arrays that flip the selected like/dislike
      const newSelected = [...likeSelected]
      newSelected[newLikeSelected] = !newSelected[newLikeSelected]
      const superSelected = [...newSelected]
      // create another variable for the like that is not currently selected
      const otherLike = newLikeSelected ? 0 : 1
      // Make sure only one like is selected locally
      if (superSelected[otherLike]) {
        superSelected[otherLike] = !superSelected[otherLike]
      }
      setSelectedLike(superSelected)
      return axios.post(
        `${apiUrl}/likes/${id}`,
        {
          text: JSON.stringify([newLikeSelected, newSelected]),
        },
        {
          headers: {
            "Content-Type": `application/json`,
          },
        }
      )
      // const xhr = new XMLHttpRequest()
      // xhr.open(`POST`, `${apiUrl}/likes/${id}`)
      // xhr.setRequestHeader(`content-type`, `application/json`)
      // // Send selected like JSON stringified to cloudflare worker
      // return xhr.send(JSON.stringify([newLikeSelected, newSelected]))
    },
    {
      onMutate: async (newLikeSelected: LikeSelected) => {
        await queryClient.cancelQueries(`getLikes/${id}`)
        const previousLikes: AllLikes = queryClient.getQueryData(
          `getLikes/${id}`
        )
        let otherLike
        if (newLikeSelected) {
          otherLike = 0
        } else {
          otherLike = 1
        }
        if (!likeSelected[newLikeSelected] && likeSelected[otherLike]) {
          previousLikes.allLikesCount[newLikeSelected] += 1
          previousLikes.allLikesCount[otherLike] -= 1
        } else if (likeSelected[newLikeSelected] && !likeSelected[otherLike]) {
          previousLikes.allLikesCount[newLikeSelected] -= 1
        } else if (!likeSelected[newLikeSelected]) {
          previousLikes.allLikesCount[newLikeSelected] += 1
        } else if (!likeSelected[otherLike]) {
          previousLikes.allLikesCount[otherLike] += 1
        }
        queryClient.setQueryData(`getLikes/${id}`, {
          allLikesCount: previousLikes.allLikesCount,
          code: 200,
          message: `success`,
        })
        return { previousLikes }
      },
      onSuccess: () => {
        setTimeout(() => {
          queryClient.invalidateQueries(`getLikes/${id}`)
          queryClient.invalidateQueries(`getPosts`)
        }, 500)
      },
    }
  )

  const handleOnClick = (curr) => {
    likeMutation.mutate(curr)
  }

  const { isLoading, data, error } = useQuery(`getLikes/${id}`, () =>
    fetch(`${apiUrl}/likes/${id}`)
      .then((res) => res.json())
      .then(({ data: apiData, ...allData }) => ({
        allLikesCount: apiData,
        ...allData,
      }))
  )
  if (isLoading) return <>Loading...</>

  if (error) return <>{`An error has occurred: ${error}`}</>

  return (
    <>
      {allLikes?.map((like, newId) => (
        <div
          role="button"
          tabIndex={0}
          style={{
            userSelect: `none`,
            cursor: `pointer`,
            textAlign: `center`,
            verticalAlign: `top`,
            display: `inline-block`,
          }}
          key={`${id}/${like}`}
          onClick={() => handleOnClick(newId)}
          onKeyDown={() => handleOnClick(newId)}
        >
          <Like id={like} />
          <span style={{ display: `block` }}>
            {data?.allLikesCount[newId] ? data?.allLikesCount[newId] : `0`}
          </span>
        </div>
      ))}
    </>
  )
}
