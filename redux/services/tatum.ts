import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tatumApi = createApi({
  reducerPath: "tatumApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/tatum",
  }),
  endpoints: (builder) => ({
    getNFTs: builder.query({
      query: ({ network, address }) => `/nft/${network}/${address}`,
    }),
  }),
});

export const { useGetNFTsQuery } = tatumApi;
