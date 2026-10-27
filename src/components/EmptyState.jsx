import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function EmptyState({
  title = 'No items yet',
  message = 'There is nothing to show here.',
  actionLabel = 'Continue shopping',
  actionHref = '/shop',
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[2rem] border border-stone-800/80 bg-stone-950/60 px-8 py-10 text-center">
      <p className="mb-3 text-xs uppercase tracking-[0.42em] text-stone-400">FIOX</p>
      <h3 className="text-3xl font-medium tracking-[-0.06em] text-white">{title}</h3>
      <p className="mt-3 max-w-md text-sm text-stone-300">{message}</p>
      <Link
        to={actionHref}
        className="mt-8 inline-flex items-center gap-2 border border-stone-700 bg-stone-100 px-5 py-3 text-sm font-medium text-stone-950 transition hover:bg-white"
      >
        {actionLabel}
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
