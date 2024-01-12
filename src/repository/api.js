import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { store } from "../redux/store";

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
  tagTypes: [],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "",
        body: "",
        method: "",
      }),
      invalidatesTags: [],
    }),
  }),
});

export const { useLoginMutation } = api;
