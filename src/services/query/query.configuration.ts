import { fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

const baseUrl = "https://ccmernapp-11a99251a1a7.herokuapp.com/api";

// Custom baseQuery function that adds token only for /order route
const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let token = localStorage.getItem("token");
  // Remove any surrounding quotes from the token if they exist
  if (token?.startsWith('"') && token?.endsWith('"')) {
    token = token.slice(1, -1);
  }
  console.log("Retrieved token:", token);

  // Determine if the request is for the needed route
  const url = typeof args === "string" ? args : args.url;
  const needsToken =
    (url.startsWith("shop/product") ||
      url.startsWith("shop/products") ||
      url.startsWith("shop/categories") ||
      url.startsWith("user") ||
      url.startsWith("shop/orders") ||
      url.startsWith("shop/order")) &&
    token;

  // If the request requires a token, attach the Authorization header
  const modifiedArgs =
    needsToken && typeof args !== "string"
      ? {
          ...args,
          headers: {
            ...args.headers,
            Authorization: `Bearer ${token}`,
          },
        }
      : args;

  // Use fetchBaseQuery with modifiedArgs
  return fetchBaseQuery({ baseUrl })(modifiedArgs, api, extraOptions);
};

export default baseQueryWithAuth;
