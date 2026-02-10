import { useRouter } from "next/navigation";

export type Attributes = Record<string, string | number>;

export type PaginatedCursor = {
    hasMore: true, cursor: {
        id: string;
        createdAt: number;
    }
} | { hasMore: false };

export type PaginatedResult<T extends object,K=PaginatedCursor> = {
    paginationState: K;
    data: T[];
};

export type NextJsRouter=ReturnType<typeof useRouter>;