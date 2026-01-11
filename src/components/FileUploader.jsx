import { useState, useCallback } from 'react'

export default function FileUploader({ onFilesSelected, multiple = true }) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragIn = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }, [])

  const handleDragOut = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files).filter(
      file => file.type === 'application/pdf'
    )
    if (files.length > 0) {
      onFilesSelected(multiple ? files : [files[0]])
    }
  }, [onFilesSelected, multiple])

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      onFilesSelected(multiple ? files : [files[0]])
    }
  }

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`
        border-2 border-dashed rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer
        ${isDragging
          ? 'border-blue-400 bg-blue-50/50'
          : 'border-gray-300 hover:border-blue-300 hover:bg-gray-50 bg-white'}
      `}
    >
      <input
        type="file"
        accept=".pdf"
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-colors ${
          isDragging ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          <svg className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
          {isDragging ? 'Drop your files here' : 'Drop PDF files here'}
        </p>
        <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-5">or tap to browse from your device</p>
        <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-sm text-sm sm:text-base">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Select {multiple ? 'Files' : 'File'}
        </span>
      </label>
    </div>
  )
}
