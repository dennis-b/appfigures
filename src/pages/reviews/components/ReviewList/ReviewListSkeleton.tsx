import { Skeleton } from '@/components/ui/skeleton'

function SkeletonCard() {
  return (
    <div className="flex flex-col gap-2 border-b border-border py-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-3.5 w-20" />
        <Skeleton className="h-3.5 w-24" />
      </div>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-5/6" />
      <Skeleton className="h-3 w-16" />
    </div>
  )
}

export function ReviewListSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
