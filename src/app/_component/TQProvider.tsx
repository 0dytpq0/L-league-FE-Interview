"use client";

import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface TQProviderProps {
  children: React.ReactNode;
}

export default function TQProvider({ children }: TQProviderProps) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000,
          gcTime: 5 * 60 * 1000,
          refetchOnReconnect: true,
          refetchOnWindowFocus: true,
          retry: 3,
        },
        mutations: {
          // 에러 발생 시 재시도 안함
          retry: false,
        },
      },
    })
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
