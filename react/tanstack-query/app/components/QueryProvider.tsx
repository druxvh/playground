"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

interface Props {
    children: React.ReactNode
}

function createQueryClient() {
    return new QueryClient
}

export default function QueryProvider({ children }: Props) {
    const [queryClient] = useState(() => createQueryClient())

    return <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
}