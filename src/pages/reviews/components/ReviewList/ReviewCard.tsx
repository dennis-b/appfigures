import {formatDate} from '@/utils'
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card'
import type {Review} from '@/api/reviews'
import {StarRating} from './StarRating'
import {ReviewBody} from './ReviewBody'

interface ReviewCardProps {
    review: Review
}

export function ReviewCard({review}: ReviewCardProps) {
    return (
        <Card className="flex flex-col gap-0 rounded-xl shadow-none">
            <CardHeader className="pb-2">
                {review.title && (
                    <h3 className="text-base font-bold leading-snug text-foreground">
                        {review.title}
                    </h3>
                )}
            </CardHeader>

            <CardContent className="flex-1 px-6 pb-4">
                {review.review && <ReviewBody text={review.review}/>}
            </CardContent>

            <CardFooter className="px-6 pb-5 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                    By {review.author} · {formatDate(review.date)}
                </div>
                <StarRating stars={review.stars}/>
            </CardFooter>
        </Card>
    )
}
