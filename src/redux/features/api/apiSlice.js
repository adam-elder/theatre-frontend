import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logoutUser } from "../user/userSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://theatre-backend-ckrm.vercel.app/api/v1/",
  // baseUrl: "http://localhost:5000",
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const parseAuth = JSON.parse(auth);
      headers.set("authorization", parseAuth.token);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error?.data.message === "jwt expired") {
    api.dispatch(logoutUser());
  }
  return result;
};
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["character", "cast"],
  endpoints: (builder) => ({}),
});
