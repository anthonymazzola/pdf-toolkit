import { useState } from 'react'
import FileUploader from '../components/FileUploader'
import { extractPages, getPDFPageCount } from '../tools/split'
import { downloadBlob } from '../tools/merge'

export default function Split() {
  const [file, setFile] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [pageRange, setPageRange] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [outputName, setOutputName] = useState('')

  const handleFileSelected = async (files) => {
    const selectedFile = files[0]
    setFile(selectedFile)
    const count = await getPDFPageCount(selectedFile)
    setPageCount(count)
    setPageRange(`1-${count}`)
  }

  const parsePageRange = (rangeStr) => {
    const pages = []
    const parts = rangeStr.split(',').map(s => s.trim())

    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(Number)
        for (let i = start; i <= end; i++) {
          if (!pages.includes(i)) pages.push(i)
        }
      } else {
        const num = Number(part)
        if (!pages.includes(num)) pages.push(num)
      }
    }

    return pages.sort((a, b) => a - b)
  }

  const handleSplit = async () => {
    if (!file || !pageRange) return

    setIsProcessing(true)
    try {
      const pages = parsePageRange(pageRange)
      const blob = await extractPages(file, pages)
      const defaultName = file.name.replace('.pdf', '') + '_extracted.pdf'
      const filename = outputName.trim() ? `${outputName.trim().replace(/\.pdf$/i, '')}.pdf` : defaultName
      downloadBlob(blob, filename)
    } catch (error) {
      console.error('Error splitting PDF:', error)
      alert('Error splitting PDF. Please check your page range.')
    }
    setIsProcessing(false)
  }

  const reset = () => {
    setFile(null)
    setPageCount(0)
    setPageRange('')
    setOutputName('')
  }

  return (
    <div className="w-full">
      {!file ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Split PDF</h1>
            <p className="text-gray-600">Extract specific pages from your PDF document.</p>
          </div>
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        </div>
      ) : (
        <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Split PDF</h1>
          <p className="text-gray-600">Extract specific pages from your PDF document.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: File info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-gray-900">Selected File</h2>
                <button
                  onClick={reset}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Choose different file
                </button>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">{pageCount} pages • {(file.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>

              {/* Page preview hint */}
              <div className="mt-6 p-4 bg-purple-50 rounded-xl">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-purple-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-medium text-purple-900">Page Range Tips</p>
                    <p className="text-sm text-purple-700 mt-1">
                      Use commas for individual pages (1, 3, 5) and dashes for ranges (1-5).
                      You can combine both: 1-3, 5, 7-10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Settings & Action */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Extract Settings</h3>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pages to Extract
                </label>
                <input
                  type="text"
                  value={pageRange}
                  onChange={(e) => setPageRange(e.target.value)}
                  placeholder="e.g., 1-3, 5, 7-10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-shadow"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Total pages in document: {pageCount}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filename (optional)
                </label>
                <input
                  type="text"
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  placeholder={`${file.name.replace('.pdf', '')}_extracted.pdf`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-shadow"
                />
              </div>

              <button
                onClick={handleSplit}
                disabled={isProcessing || !pageRange}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Extracting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                    Extract Pages
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
