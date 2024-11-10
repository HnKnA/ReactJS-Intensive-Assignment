import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithAuth from "../query/query.configuration";
import { Category } from "./product";

export interface Order {
  orderNumber: string;
  sku: string;
  status: string;
  category: Category | string;
  payment: {
    amount: number;
    received: number;
  };
  product: {
    name: string;
    regular_price: number;
    sale_price: number;
  };
  customer: string;
  created: string;
  updated: string;
}

interface CreateOrderRequest {
  productId: string;
  quantity: number;
}

interface CompleteOrderRequest {
  orderNumber: string;
}

interface GetOrderResponse {
  status: number;
  message: string;
  data?: {
    totalOrders: number;
    totalPage: number;
    pageSize: number;
    currentPage: number;
    orders: Order[];
  };
}

interface CreateOrderResponse {
  status: number;
  message: string;
  data?: Order;
}

interface CompleteOrderResponse {
  status: number;
  message: string;
  data?: Order;
}

// Create an API slice
export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    getOrder: builder.query<GetOrderResponse, void>({
      query: () => ({
        url: "shop/orders",
        method: "GET",
      }),
    }),
    createOrder: builder.mutation<
      CreateOrderResponse,
      Partial<CreateOrderRequest>
    >({
      query: (createOrderRequest) => ({
        url: "shop/order/create",
        method: "POST",
        body: createOrderRequest,
      }),
    }),
    completeOrder: builder.mutation<
      CompleteOrderResponse,
      Partial<CompleteOrderRequest>
    >({
      query: (completeOrderRequest) => ({
        url: "shop/order/complete",
        method: "POST",
        body: completeOrderRequest,
      }),
    }),
  }),
});

export const {
  useGetOrderQuery,
  useCreateOrderMutation,
  useCompleteOrderMutation,
} = orderApi;
