import { lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'motion/react'
import { SmoothScroll } from './components/SmoothScroll'
import { RedirectWithParam } from './components/RedirectWithParam'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'

// Home is eager (landing route); the rest split into their own chunks.
const Products = lazy(() => import('./pages/Products').then((m) => ({ default: m.Products })))
const ProductDetail = lazy(() =>
  import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })),
)
const PolyBot = lazy(() => import('./pages/PolyBot').then((m) => ({ default: m.PolyBot })))
const AiAgent = lazy(() => import('./pages/AiAgent').then((m) => ({ default: m.AiAgent })))
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })))
const HowItWorks = lazy(() => import('./pages/HowItWorks').then((m) => ({ default: m.HowItWorks })))
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const RiskDisclosure = lazy(() =>
  import('./pages/legal/RiskDisclosure').then((m) => ({ default: m.RiskDisclosure })),
)
const Terms = lazy(() => import('./pages/legal/Terms').then((m) => ({ default: m.Terms })))
const Privacy = lazy(() => import('./pages/legal/Privacy').then((m) => ({ default: m.Privacy })))
const Refunds = lazy(() => import('./pages/legal/Refunds').then((m) => ({ default: m.Refunds })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

export function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <LazyMotion features={domAnimation} strict>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/forex" element={<Products />} />
              <Route path="/forex/:id" element={<ProductDetail />} />
              <Route path="/crypto-futures-signals" element={<AiAgent />} />
              <Route path="/ai-agent" element={<Navigate to="/crypto-futures-signals" replace />} />
              <Route path="/polymarket" element={<PolyBot />} />
              <Route path="/polybot" element={<Navigate to="/polymarket" replace />} />
              {/* legacy → new (Founding Members retired 2026-06-11 — pricing lives on /forex) */}
              <Route path="/founding-members" element={<Navigate to="/forex" replace />} />
              <Route path="/pricing" element={<Navigate to="/forex" replace />} />
              <Route path="/products" element={<Navigate to="/forex" replace />} />
              <Route
                path="/products/:id"
                element={<RedirectWithParam to={(id) => `/forex/${id}`} />}
              />
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/risk-disclosure" element={<RiskDisclosure />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/refunds" element={<Refunds />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </LazyMotion>
      </SmoothScroll>
    </BrowserRouter>
  )
}
