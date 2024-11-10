import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../query/query.configuration";

interface LoginRequest {
  userName: string;
  password: string;
}

interface LoginResponse {
  status: number;
  message: string;
}

interface VerifyRequest {
  userName: string;
  code: string;
}

interface VerifyResponse {
  status: number;
  message: string;
  data?: {
    token: string;
    refreshToken: string;
  };
}

interface RegisterRequest {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface RegisterResponse {
  status: number;
  message: string;
}

// Create an API slice
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    loginUser: builder.mutation<LoginResponse, Partial<LoginRequest>>({
      query: (loginRequest) => ({
        url: "auth/login",
        method: "POST",
        body: loginRequest,
      }),
    }),
    registerUser: builder.mutation<RegisterResponse, Partial<RegisterRequest>>({
      query: (registerRequest) => ({
        url: "auth/register",
        method: "POST",
        body: registerRequest,
      }),
    }),
    verifyUser: builder.mutation<VerifyResponse, Partial<VerifyRequest>>({
      query: (verifyRequest) => ({
        url: "auth/verify",
        method: "POST",
        body: verifyRequest,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useVerifyUserMutation,
  useRegisterUserMutation,
} = authApi;
