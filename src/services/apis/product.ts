import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../query/query.configuration";

export interface Category {
  name: string;
  img?: string;
  code?: string;
  categoryId: string;
  id?: string;
  category?: string;
  in_stock?: number;
  sold?: number;
  regular_price?: number;
  sale_price?: number;
  rating?: number;
}

export interface Product {
  id: string;
  name: string;
  category: string | Category;
  regular_price: number;
  img?: string;
  in_stock?: number;
  sold?: number;
  sale_price?: number;
  rating?: number;
}

interface PostProductResponse {
  status: number;
  message: string;
}

interface PatchProductResponse {
  status: number;
  message: string;
}

interface DeleteProductResponse {
  status: number;
  message: string;
}

interface GetProductsResponse {
  status: number;
  message: string;
  data?: {
    totalProducts: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    products: Product[];
  };
}

interface GetCategoriesResponse {
  status: number;
  message: string;
  data?: {
    totalProducts: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    categories: Category[];
  };
}

// Create an API slice
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    postProduct: builder.mutation<PostProductResponse, Partial<Product>>({
      query: (postProductRequest) => ({
        url: "shop/product",
        method: "POST",
        body: postProductRequest,
      }),
    }),
    getProducts: builder.query<GetProductsResponse, void>({
      query: () => ({
        url: "shop/products",
        method: "GET",
      }),
    }),
    patchProduct: builder.mutation<
      PatchProductResponse,
      { productId: string; patchProductRequest: Partial<Product> }
    >({
      query: ({ productId, patchProductRequest }) => ({
        url: `shop/product/${productId}`,
        method: "PATCH",
        body: patchProductRequest,
      }),
    }),
    deleteProduct: builder.mutation<DeleteProductResponse, string>({
      query: (productId) => ({
        url: `shop/product/${productId}`,
        method: "DELETE",
      }),
    }),
    getCategories: builder.query<GetCategoriesResponse, void>({
      query: () => ({
        url: "shop/categories",
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePostProductMutation,
  useGetProductsQuery,
  usePatchProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productApi;
