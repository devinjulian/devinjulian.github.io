import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'motion/react'
import { SmoothScroll } from './components/SmoothScroll'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'

// Home is eager (landing route); the rest split into their own chunks.
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const Pricing = lazy(() => import('./pages/Pricing').then((m) => ({ default: m.Pricing })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <LazyMotion features={domAnimation} strict>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </LazyMotion>
      </SmoothScroll>
    </BrowserRouter>
  )
}
