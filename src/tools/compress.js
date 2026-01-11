import { PDFDocument } from 'pdf-lib'

export async function compressPDF(file, quality = 0.7) {
  const arrayBuffer = await file.arrayBuffer()
  const sourcePdf = await PDFDocument.load(arrayBuffer)

  // Create a new PDF with the same pages
  // Note: pdf-lib doesn't have built-in image compression,
  // but we can remove metadata and optimize structure
  const compressedPdf = await PDFDocument.create()

  const pages = await compressedPdf.copyPages(sourcePdf, sourcePdf.getPageIndices())
  pages.forEach(page => compressedPdf.addPage(page))

  // Remove metadata for smaller file size
  compressedPdf.setTitle('')
  compressedPdf.setAuthor('')
  compressedPdf.setSubject('')
  compressedPdf.setKeywords([])
  compressedPdf.setProducer('')
  compressedPdf.setCreator('')

  const pdfBytes = await compressedPdf.save({
    useObjectStreams: true,  // Compress object streams
    addDefaultPage: false,
  })

  return new Blob([pdfBytes], { type: 'application/pdf' })
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
