import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GATEWAY_REWRITE, removeIpfsStart } from "lib/ipfs";

export const ipfsApi = createApi({
  reducerPath: "ipfsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: GATEWAY_REWRITE,
  }),
  endpoints: (builder) => ({
    metadata: builder.query({
      query: (url) => removeIpfsStart(url),
    }),
  }),
});

export const { useMetadataQuery } = ipfsApi;
