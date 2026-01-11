import type { TApiResponse } from "@/types/index.type";
import { apiSlice } from "./api-slice";
import type { TTopUpSchemaRequest } from "@/validation/top-up.validation";
import type {
  THistoryResponse,
  TTransactionRecord,
  TTransactionRequest,
} from "@/types/transaction.type";

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBalance: builder.query<{ balance: number }, void>({
      query: () => "/balance",
      providesTags: ["Balance"],
      transformResponse: (response: TApiResponse<{ balance: number }>) =>
        response.data,
    }),

    topUp: builder.mutation<
      TApiResponse<{ balance: number } | null>,
      TTopUpSchemaRequest
    >({
      query: (body) => ({
        url: "/topup",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Balance", "Transaction"],
    }),

    createTransaction: builder.mutation<
      TApiResponse<TTransactionRecord | null>,
      TTransactionRequest
    >({
      query: (body) => ({
        url: "/transaction",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Balance", "Transaction"],
    }),

    getHistory: builder.query<
      THistoryResponse,
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) =>
        `/transaction/history?offset=${offset}&limit=${limit}`,
      transformResponse: (response: TApiResponse<THistoryResponse>) =>
        response.data,
      providesTags: ["Transaction"],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      merge: (currentCache, newItems, { arg }) => {
        if (arg.offset === 0) return newItems;
        currentCache.records.push(...newItems.records);
      },
      forceRefetch: ({ currentArg, previousArg }) => currentArg !== previousArg,
    }),
  }),
});

export const {
  useGetBalanceQuery,
  useTopUpMutation,
  useCreateTransactionMutation,
  useGetHistoryQuery,
} = transactionApi;
