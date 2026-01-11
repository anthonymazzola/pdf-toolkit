import { Link } from 'react-router-dom'
import AdBanner from '../components/AdBanner'

const tools = [
  {
    name: 'Merge PDFs',
    description: 'Combine multiple PDF files into a single document. Drag to reorder pages.',
    path: '/merge',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    color: 'from-blue-500 to-blue-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    name: 'Split PDF',
    description: 'Extract specific pages or split a PDF into multiple documents.',
    path: '/split',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    color: 'from-purple-500 to-purple-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-600'
  },
  {
    name: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality. Save storage space.',
    path: '/compress',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    ),
    color: 'from-green-500 to-green-600',
    bgLight: 'bg-green-50',
    textColor: 'text-green-600'
  }
]

const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: '100% Private',
    description: 'Your files never leave your device. All processing happens in your browser.',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Instant processing with no upload wait times. Works offline too.',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Completely Free',
    description: 'No signup, no limits, no watermarks. Just free PDF tools.',
    color: 'text-rose-600',
    bg: 'bg-rose-100'
  }
]

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-3 tracking-tight">
          Free Online PDF Tools
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          Merge, split, and compress PDFs directly in your browser.
          No uploads, no signups — your files stay private.
        </p>
      </div>

      {/* Tool Cards - Full width grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 mb-6 sm:mb-8">
        {tools.map((tool) => (
          <Link
            key={tool.path}
            to={tool.path}
            className="group relative bg-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200"
          >
            <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br ${tool.color} rounded-lg sm:rounded-xl flex items-center justify-center text-white mb-4 sm:mb-5 shadow-sm group-hover:scale-110 transition-transform duration-200`}>
              {tool.icon}
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">{tool.name}</h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{tool.description}</p>
            <div className={`mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-sm font-medium ${tool.textColor}`}>
              Get started
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* Ad Banner */}
      <div className="mb-6 sm:mb-8">
        <AdBanner slot="XXXXXXXXXX" format="horizontal" />
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-5 sm:p-6 lg:p-8">
        <h3 className="text-center text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 sm:mb-8">
          Why choose PDF Toolkit?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${feature.bg} rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 ${feature.color}`}>
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2">{feature.title}</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
