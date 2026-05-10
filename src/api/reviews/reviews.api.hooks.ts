import { useInfiniteQuery, useIsFetching } from '@tanstack/react-query'
import { PAGE_SIZE, ReviewsQueryKey } from './reviews.api.constants'
import { fetchReviews } from './reviews.api'
import type { ReviewsParams } from './reviews.api.types'

export function useReviews(params: Omit<ReviewsParams, 'page'>) {
  return useInfiniteQuery({
    queryKey: [ReviewsQueryKey.Reviews, params],
    queryFn: ({ pageParam }) => fetchReviews({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) =>
      lastPage.reviews.length === PAGE_SIZE ? lastPageParam + 1 : undefined,
    staleTime: 60_000,
  })
}

export function useIsLoadingReviews() {
  return useIsFetching({ queryKey: [ReviewsQueryKey.Reviews] }) > 0
}
