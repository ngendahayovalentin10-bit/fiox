import { MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import SearchOverlay from './components/SearchOverlay'
import { BagProvider } from './context/BagContext'
import { WishlistProvider } from './context/WishlistContext'
import { siteConfig } from './data/siteConfig'
import AboutPage from './pages/AboutPage'
import CartPage from './pages/CartPage'
import CollectionDetailPage from './pages/CollectionDetailPage'
import CollectionsPage from './pages/CollectionsPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ShopPage from './pages/ShopPage'
import WishlistPage from './pages/WishlistPage'
import './App.css'

function FloatingWhatsAppButton() {
  const number = siteConfig.businessNumber?.replace(/\D/g, '')

  const handleClick = (event) => {
    if (!number) {
      event.preventDefault()
      window.alert(siteConfig.placeholderContact)
    }
  }

  const href = number ? `https://wa.me/${number}?text=${encodeURIComponent('Hello FIOX, I would like to ask a question.')}` : '#'

  return (
    <a
      href={href}
      target={number ? '_blank' : undefined}
      rel={number ? 'noreferrer' : undefined}
      aria-label="Contact us on WhatsApp"
      onClick={handleClick}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#27d366] text-white shadow-[0_15px_35px_rgba(39,211,102,0.45)] transition hover:scale-105 hover:bg-[#1fc55c]"
    >
      <MessageCircle size={26} />
    </a>
  )
}

function AppLayout() {
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname, location.search])

  return (
    <>
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main className="min-h-[70vh] bg-[#0b0b0b] text-stone-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:slug" element={<CollectionDetailPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <FloatingWhatsAppButton />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BagProvider>
      <WishlistProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </WishlistProvider>
    </BagProvider>
  )
}
