export default function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="flex items-center gap-3 text-sm uppercase tracking-[0.35em] text-stone-400">
        <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-stone-300" />
        {message}
      </div>
    </div>
  )
}
