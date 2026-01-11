import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Merge from './pages/Merge'
import Split from './pages/Split'
import Compress from './pages/Compress'

function NavLink({ to, children }) {
  const location = useLocation()
  const isActive = location.pathname === to
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
        isActive
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  )
}

function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Full width */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full px-4 sm:px-6 lg:px-12 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="font-bold text-base sm:text-lg text-gray-900 hidden sm:block">PDF Toolkit</span>
          </Link>
          <nav className="flex items-center">
            <NavLink to="/merge">Merge</NavLink>
            <NavLink to="/split">Split</NavLink>
            <NavLink to="/compress">Compress</NavLink>
          </nav>
        </div>
      </header>

      {/* Main - Flexible grow */}
      <main className="flex-1 py-6 sm:py-10 px-4 sm:px-6 lg:px-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/merge" element={<Merge />} />
          <Route path="/split" element={<Split />} />
          <Route path="/compress" element={<Compress />} />
        </Routes>
      </main>

      {/* Footer - Full width */}
      <footer className="border-t border-gray-200 bg-white py-4 sm:py-5 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <p className="text-xs sm:text-sm text-gray-500">
            PDF Toolkit — Free online PDF tools
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              Files processed locally
            </span>
            <span className="hidden sm:inline">No data uploaded</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}

export default App
