import { useState } from 'react'
import FileUploader from '../components/FileUploader'
import { compressPDF, formatFileSize } from '../tools/compress'
import { downloadBlob } from '../tools/merge'

export default function Compress() {
  const [file, setFile] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState(null)
  const [outputName, setOutputName] = useState('')

  const handleFileSelected = (files) => {
    setFile(files[0])
    setResult(null)
  }

  const handleCompress = async () => {
    if (!file) return

    setIsProcessing(true)
    try {
      const compressedBlob = await compressPDF(file)
      const savings = ((file.size - compressedBlob.size) / file.size * 100).toFixed(1)

      setResult({
        blob: compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        savings: Math.max(0, savings)
      })
    } catch (error) {
      console.error('Error compressing PDF:', error)
      alert('Error compressing PDF. Please try again.')
    }
    setIsProcessing(false)
  }

  const handleDownload = () => {
    if (result) {
      const defaultName = file.name.replace('.pdf', '') + '_compressed.pdf'
      const filename = outputName.trim() ? `${outputName.trim().replace(/\.pdf$/i, '')}.pdf` : defaultName
      downloadBlob(result.blob, filename)
    }
  }

  const reset = () => {
    setFile(null)
    setResult(null)
    setOutputName('')
  }

  return (
    <div className="w-full">
      {!file ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Compress PDF</h1>
            <p className="text-gray-600">Reduce your PDF file size while maintaining quality.</p>
          </div>
          <FileUploader onFilesSelected={handleFileSelected} multiple={false} />
        </div>
      ) : (
        <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Compress PDF</h1>
          <p className="text-gray-600">Reduce your PDF file size while maintaining quality.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: File info & Results */}
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
                  <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>

              {/* Compression Results */}
              {result && (
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Compression Results</h3>
                  <div className="bg-green-50 rounded-xl p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Original</p>
                        <p className="text-lg font-semibold text-gray-900">{formatFileSize(result.originalSize)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Compressed</p>
                        <p className="text-lg font-semibold text-green-600">{formatFileSize(result.compressedSize)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Saved</p>
                        <p className="text-lg font-semibold text-green-600">{result.savings}%</p>
                      </div>
                    </div>

                    {/* Progress bar visualization */}
                    <div className="mt-6">
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="text-gray-600">Size reduction</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-500"
                          style={{ width: `${100 - result.savings}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Settings & Action */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-gray-900 mb-4">Output Settings</h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filename (optional)
                </label>
                <input
                  type="text"
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  placeholder={file ? `${file.name.replace('.pdf', '')}_compressed.pdf` : 'compressed.pdf'}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-shadow"
                />
              </div>

              {result ? (
                <button
                  onClick={handleDownload}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download Compressed PDF
                </button>
              ) : (
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Compressing...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      Compress PDF
                    </>
                  )}
                </button>
              )}

              {result && (
                <button
                  onClick={() => setResult(null)}
                  className="w-full mt-3 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Compress Again
                </button>
              )}
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  )
}
