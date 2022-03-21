import * as React from "react"
import { useQuery } from "react-query"
import DefaultPost from "../organisms/DefaultPost"
import AddPost from "../organisms/AddPost"
import { apiUrl } from "../constants"
import AddUser from "../organisms/AddUser"

export default function VerifyUser() {
  const {
    isLoading: verifying,
    data: userData,
    error: userError,
  } = useQuery(`verifyUser`, () =>
    fetch(`${apiUrl}/user`, {
      credentials: `include`,
    })
      .then((res) => res.json())
      .then(({ user, ...allData }) => ({
        user,
        ...allData,
      }))
  )
  if (verifying) {
    return <DefaultPost message="Loading..." />
  }
  if (userError) {
    return <DefaultPost message={`An error has occurred: ${userError}`} />
  }
  if (!userData.user) {
    return <AddUser />
  }
  return <AddPost user={userData.user} />
}
