import { useState } from 'react'
import FileUploader from '../components/FileUploader'
import { mergePDFs, downloadBlob } from '../tools/merge'

export default function Merge() {
  const [files, setFiles] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [outputName, setOutputName] = useState('')

  const handleFilesSelected = (newFiles) => {
    setFiles(prev => [...prev, ...newFiles])
  }

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const moveFile = (index, direction) => {
    const newFiles = [...files]
    const newIndex = index + direction
    if (newIndex >= 0 && newIndex < files.length) {
      [newFiles[index], newFiles[newIndex]] = [newFiles[newIndex], newFiles[index]]
      setFiles(newFiles)
    }
  }

  const handleMerge = async () => {
    if (files.length < 2) return

    setIsProcessing(true)
    try {
      const mergedBlob = await mergePDFs(files)
      const filename = outputName.trim() ? `${outputName.trim().replace(/\.pdf$/i, '')}.pdf` : 'merged.pdf'
      downloadBlob(mergedBlob, filename)
    } catch (error) {
      console.error('Error merging PDFs:', error)
      alert('Error merging PDFs. Please try again.')
    }
    setIsProcessing(false)
  }

  return (
    <div className="w-full">
      {files.length === 0 ? (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF Files</h1>
            <p className="text-gray-600">Combine multiple PDFs into a single document. Drag to reorder.</p>
          </div>
          <FileUploader onFilesSelected={handleFilesSelected} multiple={true} />
        </div>
      ) : (
        <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Merge PDF Files</h1>
          <p className="text-gray-600">Combine multiple PDFs into a single document. Drag to reorder.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Upload area */}
          <div className="lg:col-span-2">
            <FileUploader onFilesSelected={handleFilesSelected} multiple={true} />

            {files.length > 0 && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">
                  Selected Files ({files.length})
                </h2>
                <button
                  onClick={() => setFiles([])}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => moveFile(index, -1)}
                        disabled={index === 0}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => moveFile(index, 1)}
                        disabled={index === files.length - 1}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => removeFile(index)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
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
                placeholder="merged.pdf"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
              />
            </div>

            <button
              onClick={handleMerge}
              disabled={files.length < 2 || isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Merging...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Merge {files.length > 0 ? `${files.length} PDFs` : 'PDFs'}
                </>
              )}
            </button>

            {files.length > 0 && files.length < 2 && (
              <p className="mt-3 text-sm text-amber-600 text-center">
                Add at least 2 files to merge
              </p>
            )}
          </div>
        </div>
        </div>
        </>
      )}
    </div>
  )
}
