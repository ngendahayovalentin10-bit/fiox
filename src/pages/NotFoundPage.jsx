import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center px-6 py-20 text-center md:px-8">
      <p className="text-xs uppercase tracking-[0.42em] text-stone-400">404</p>
      <h1 className="mt-4 text-4xl tracking-[-0.06em] text-white md:text-6xl">Page not found.</h1>
      <p className="mt-5 max-w-xl text-base text-stone-300">
        The route you’re looking for isn’t available. Return to the storefront and keep exploring the latest FIOX drops.
      </p>
      <Link to="/" className="mt-8 inline-flex items-center gap-2 border border-stone-100 bg-stone-100 px-5 py-3 text-xs uppercase tracking-[0.24em] text-stone-900 transition hover:bg-white">
        <ArrowLeft size={15} />
        Return home
      </Link>
    </div>
  )
}
