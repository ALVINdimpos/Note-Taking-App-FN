import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_URL = "http://localhost:8080/";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => {
    return {
      login: builder.mutation({
        query: ({ email, password }) => ({
          url: "auth/login",
          method: "POST",
          body: { email, password },
        }),
      }),
      getNote: builder.query({
        query: () => ({
          url: `notes`,
          method: "GET",
        }),
      }),
      createNote: builder.mutation({
        query: ({ title, content }) => ({
          url: `notes`,
          method: "POST",
          body: { title, content },
        }),
      }),
      deleteNote: builder.mutation({
        query: ({ id }) => ({
          url: `notes/${id}`,
          method: "DELETE",
        }),
      }),
      register: builder.mutation({
        query: ({ firstName, lastName, email, password }) => ({
          url: "auth/signup",
          method: "POST",
          body: {
            firstName,
            lastName,
            email,
            password,
          },
        }),
      }),
      updateNote: builder.mutation({
        query: ({ id, title, content }) => ({
          url: `notes/${id}`,
          method: "PUT",
          body: { title, content },
        }),
      }),
      ressetPassword: builder.mutation({
        query: ({ email }) => ({
          url: `auth/forgot-password`,
          method: "POST",
          body: { email },
        }),
      }),
      setNewPassword: builder.mutation({
        query: ({ newPassword, token }) => ({
          url: `auth/reset-password/${token}`,
          method: "POST",
          body: { newPassword },
        }),
      }),
      changePassword: builder.mutation({
        query: ({ currentPassword, newPassword }) => ({
          url: `auth/change-password`,
          method: "POST",
          body: { currentPassword, newPassword },
        }),
      }),
    };
  }
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetNoteQuery,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
  useRessetPasswordMutation,
  useSetNewPasswordMutation,
  useChangePasswordMutation,

} = apiSlice;
