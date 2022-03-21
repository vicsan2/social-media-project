import * as Yup from "yup"

export const postSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, `Too Short!`)
    .max(30, `Too Long!`)
    .required(`Required`),
  userName: Yup.string().max(15, `Too Long!`).notRequired(),
  content: Yup.string()
    .min(1, `Too Short!`)
    .max(500, `Too Long!`)
    .required(`Required`),
})

export const commentSchema = Yup.object().shape({
  userName: Yup.string().max(15, `Too Long!`).notRequired(),
  comment: Yup.string()
    .min(1, `Too Short!`)
    .max(250, `Too Long!`)
    .required(`Required`),
})

export const userSchema = Yup.object().shape({
  user: Yup.string().max(15, `Too Long!`),
})
