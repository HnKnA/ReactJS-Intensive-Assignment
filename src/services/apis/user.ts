import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../query/query.configuration";

interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface SearchUserRequest {
  searchKey: string;
}

interface GetUserAccountResponse {
  status: number;
  message: string;
  data?: {
    userId: string;
    userName: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface SearchUserResponse {
  status: number;
  message: string;
  data?: {
    totalUsers: number;
    totalPage: number;
    pageSize: number;
    users: User[];
  };
}

// Create an API slice
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getUserAccount: builder.query<GetUserAccountResponse, void>({
      query: () => ({
        url: "user",
        method: "GET",
      }),
    }),
    searchUser: builder.mutation<SearchUserResponse, SearchUserRequest>({
      query: (searchRequest) => ({
        url: "user/search",
        method: "POST",
        body: searchRequest,
      }),
    }),
  }),
});

export const { useGetUserAccountQuery, useSearchUserMutation } = userApi;
