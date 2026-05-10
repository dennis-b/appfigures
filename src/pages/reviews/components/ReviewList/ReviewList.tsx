import {useSearch} from '@tanstack/react-router'
import {AlertCircle} from 'lucide-react'
import {useReviews} from '@/api/reviews'
import {useErrorToast} from '@/hooks'
import {groupReviewsByDate} from '@/utils/reviews/reviews.grouping'
import {Button} from '@/components/ui/button'
import {Route} from '@/routes/reviews'
import {LoadMoreButton} from './LoadMoreButton'
import {ReviewGroup} from './ReviewGroup'
import {ReviewListEmptyState} from './ReviewListEmptyState'
import {ReviewListSkeleton} from './ReviewListSkeleton'

export function ReviewList() {
    const {q, stars} = useSearch({from: Route.fullPath})

    const {
        data,
        isPending,
        isError,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        refetch,
    } = useReviews({q, stars})

    useErrorToast(isError)

    if (isPending) {
        return <ReviewListSkeleton/>
    }

    if (isError) {
        return (
            <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
                <AlertCircle className="text-destructive" size={32}/>
                <p className="text-sm">Failed to load reviews.</p>
                <Button variant="outline" size="sm" onClick={() => refetch()}>
                    Try again
                </Button>
            </div>
        )
    }

    const allReviews = data?.pages.flatMap((p) => p.reviews) ?? []

    if (allReviews.length === 0) {
        return <ReviewListEmptyState hasFilters={!!(q || stars)}/>
    }

    const groups = groupReviewsByDate(allReviews)

    return (
        <div className="flex flex-col gap-0">
            {groups.map((group) => (
                <ReviewGroup key={group.label} group={group}/>
            ))}

            {hasNextPage && (
                <LoadMoreButton onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}/>
            )}
        </div>
    )
}
