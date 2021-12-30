import * as React from "react";
import { useMutation, useQueryClient } from "react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { apiUrl } from "../constants";

const postSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  userName: Yup.string().max(15, "Too Long!").notRequired("Not Required"),
  content: Yup.string()
    .min(1, "Too Short!")
    .max(500, "Too Long!")
    .required("Required"),
});

// Requst adding of new post to the kv namespace.
// If successful, display post to user before refreshing all posts
function AddPost() {
  const queryClient = useQueryClient();
  const postMutation = useMutation(
    (newPost) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", `${apiUrl}/posts`);
      xhr.setRequestHeader("content-type", "application/json");
      return xhr.send(JSON.stringify(newPost));
    },
    {
      onMutate: async (newPost) => {
        await queryClient.cancelQueries("getPosts");
        const previousPosts = queryClient.getQueryData("getPosts");
        if (!previousPosts.allPosts) {
          previousPosts.allPosts = [];
        }
        queryClient.setQueryData("getPosts", {
          allPosts: [
            ...previousPosts.allPosts,
            { ...newPost, id: previousPosts.allPosts.length },
          ],
          code: 200,
          message: "success",
        });
        return { previousPosts };
      },
      onSuccess: () =>
        setTimeout(() => queryClient.invalidateQueries("getPosts"), 500),
    },
  );

  return (
    <div
      style={{
        borderRadius: 15,
        maxWidth: 320,
        margin: "10px auto",
        border: "2px solid pink",
        padding: 10,
        overflow: "auto",
      }}
    >
      <h1 style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}>
        Create Post
      </h1>
      <Formik
        initialValues={{
          title: "",
          userName: "",
          content: "",
        }}
        validationSchema={postSchema}
        onSubmit={(values) => {
          document.getElementById("post").reset();
          const parsedUserName = values.userName.trim();
          // When submited, attempt to send new post
          postMutation.mutate({
            ...values,
            userName: !parsedUserName.length ? "Anonymous" : parsedUserName,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form id="post">
            <div
              style={{
                marginBottom: 10,
                borderBottom: "1px solid black",
                paddingBottom: 10,
              }}
            >
              Username: <Field name="userName" />
              {errors.userName && touched.userName ? (
                <div>{errors.userName}</div>
              ) : null}
            </div>
            <div
              style={{
                marginBottom: 10,
                borderBottom: "1px solid black",
                paddingBottom: 10,
              }}
            >
              Title: <Field name="title" />
              {errors.title && touched.title ? <div>{errors.title}</div> : null}
            </div>
            <p>Content:</p>
            <Field
              name="content"
              component="textarea"
              rows="5"
              cols="41"
              style={{ resize: "none" }}
            />
            {errors.content && touched.content ? (
              <div>{errors.content}</div>
            ) : null}
            <div style={{ marginTop: 10, textAlign: "right" }}>
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddPost;
