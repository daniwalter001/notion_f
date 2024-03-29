import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_BASE_URL,
    prepareHeaders: async (headers) => {
      //   let user = store.getState()?.user.user;
      //   const token = await user?.token;
      // console.log({ token });
      //   if (token) {
      //     headers.set("Authorization", `${token}`);
      //   }
      return headers;
    },
  }),
  tagTypes: ["Task"],
  endpoints: (builder) => ({
    getTask: builder.query({
      query: (token) => `/task/${token}`,
      providesTags: ["Task"],
    }),
    getAllTasks: builder.query({
      query: () => `/task/all`,
      providesTags: ["Task"],
    }),
    add: builder.mutation({
      query: (data) => ({
        url: "/task/add",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["Task"],
    }),
    updateTask: builder.mutation({
      query: ({ token, data }) => ({
        url: `/task/update/${token}`,
        body: data,
        method: "PATCH",
      }),
      invalidatesTags: ["Task"],
    }),
    deleteTask: builder.mutation({
      query: (token) => ({
        url: `/task/delete/${token}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useAddMutation,
  useDeleteTaskMutation,
  useGetAllTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
} = api;
