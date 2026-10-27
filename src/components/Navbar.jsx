import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useBag } from '../context/BagContext'
import { useWishlist } from '../context/WishlistContext'
import { siteConfig } from '../data/siteConfig'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/collections', label: 'Collections' },
  { to: '/about', label: 'About' },
]

function navClassName({ isActive }) {
  return [
    'text-sm uppercase tracking-[0.22em] transition',
    isActive ? 'text-white' : 'text-stone-300 hover:text-white',
  ].join(' ')
}

export default function Navbar({ onSearchOpen }) {
  const [open, setOpen] = useState(false)
  const { itemCount } = useBag()
  const { count } = useWishlist()

  return (
    <header className="sticky top-0 z-40 border-b border-stone-800/80 bg-[#0c0c0c]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
        <NavLink to="/" className="text-lg font-medium tracking-[0.42em] text-white">
          {siteConfig.brandName}
        </NavLink>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClassName}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button type="button" aria-label="Search products" onClick={onSearchOpen} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 bg-transparent text-white transition hover:border-stone-500 hover:bg-stone-900">
            <Search size={16} />
          </button>

          <NavLink to="/wishlist" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 bg-transparent text-white transition hover:border-stone-500 hover:bg-stone-900" aria-label="Wishlist">
            <Heart size={16} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-100 px-1 text-[10px] font-medium text-stone-900">
                {count}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 bg-transparent text-white transition hover:border-stone-500 hover:bg-stone-900" aria-label="Shopping bag">
            <ShoppingBag size={16} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-stone-100 px-1 text-[10px] font-medium text-stone-900">
                {itemCount}
              </span>
            )}
          </NavLink>

          <button type="button" aria-label="Open menu" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-700 bg-transparent text-white md:hidden">
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-stone-800 bg-[#0b0b0b] md:hidden">
          <div className="mx-auto max-w-7xl space-y-2 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) => [
                  'block rounded-xl px-3 py-3 text-sm uppercase tracking-[0.24em] transition',
                  isActive ? 'bg-stone-100 text-stone-900' : 'text-stone-200 hover:bg-stone-900',
                ].join(' ')}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
