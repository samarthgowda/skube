import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/users",
  }),
  endpoints: (builder) => ({
    fetchProfileNft: builder.query({
      query: (address) => `/profile/${address}`,
    }),
  }),
});

export const { useFetchProfileNftQuery } = userApi;
