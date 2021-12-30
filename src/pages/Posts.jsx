import * as React from "react";
import { useQuery } from "react-query";
import Post from "../components/Post";
import DefaultPost from "../components/DefaultPost";
import AddPost from "../components/AddPost";
import { apiUrl } from "../constants";
import { PostProvider } from "../contexts/Post";

// Get all posts from worker and see organize them correctly. If there are no posts, create a default post that states so.
function Posts() {
  const { isLoading, data, error } = useQuery("getPosts", () =>
    fetch(`${apiUrl}/posts`)
      .then((res) => res.json())
      .then(({ data: apiData, ...allData }) => ({
        allPosts: apiData,
        ...allData,
      })),
  );

  if (isLoading) return <DefaultPost message="Loading..." />;

  if (error)
    return <DefaultPost message={`An error has occurred: ${error.message}`} />;

  return (
    <>
      <AddPost />
      {/* AddPost always returned, then if there are no posts, return default. Otherwise display each post */}
      {!data?.allPosts?.length && <DefaultPost message={data?.message} />}
      {data?.allPosts?.map((postData) => (
        <PostProvider>
          <Post key={postData.id} data={postData} />
        </PostProvider>
      ))}
    </>
  );
}

export default Posts;
