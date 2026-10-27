import { Link } from 'react-router-dom'
import { siteConfig } from '../data/siteConfig'

export default function Footer() {
  return (
    <footer className="border-t border-stone-800/80 bg-[#111111] text-stone-300">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.46em] text-stone-400">{siteConfig.brandName}</p>
            <p className="max-w-xs text-2xl font-medium tracking-[-0.06em] text-white">{siteConfig.tagline}</p>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">Explore</p>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
              <li><Link to="/collections" className="hover:text-white">Collections</Link></li>
              <li><Link to="/about" className="hover:text-white">About</Link></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">Support</p>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
              <li><a href="#" className="hover:text-white">Shipping &amp; Returns</a></li>
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-stone-500">Social</p>
            <ul className="space-y-3 text-sm text-stone-300">
              <li><a href={siteConfig.socialLinks.instagram || '#'} className="hover:text-white">Instagram</a></li>
              <li><a href={siteConfig.socialLinks.tiktok || '#'} className="hover:text-white">TikTok</a></li>
              <li><a href={siteConfig.socialLinks.facebook || '#'} className="hover:text-white">Facebook</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-stone-800/80 pt-6 text-xs uppercase tracking-[0.28em] text-stone-500 md:flex-row md:items-center md:justify-between">
          <span>© 2025 FIOX</span>
          <span>Demo storefront content</span>
        </div>
      </div>
    </footer>
  )
}
