import { PDFDocument } from 'pdf-lib'

export async function splitPDF(file, ranges) {
  const arrayBuffer = await file.arrayBuffer()
  const sourcePdf = await PDFDocument.load(arrayBuffer)
  const results = []

  for (const range of ranges) {
    const newPdf = await PDFDocument.create()
    const pageIndices = []

    for (let i = range.start - 1; i < range.end; i++) {
      if (i >= 0 && i < sourcePdf.getPageCount()) {
        pageIndices.push(i)
      }
    }

    const pages = await newPdf.copyPages(sourcePdf, pageIndices)
    pages.forEach(page => newPdf.addPage(page))

    const pdfBytes = await newPdf.save()
    results.push({
      blob: new Blob([pdfBytes], { type: 'application/pdf' }),
      name: `split_${range.start}-${range.end}.pdf`
    })
  }

  return results
}

export async function extractPages(file, pageNumbers) {
  const arrayBuffer = await file.arrayBuffer()
  const sourcePdf = await PDFDocument.load(arrayBuffer)
  const newPdf = await PDFDocument.create()

  const validIndices = pageNumbers
    .map(n => n - 1)
    .filter(i => i >= 0 && i < sourcePdf.getPageCount())

  const pages = await newPdf.copyPages(sourcePdf, validIndices)
  pages.forEach(page => newPdf.addPage(page))

  const pdfBytes = await newPdf.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}

export async function getPDFPageCount(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  return pdf.getPageCount()
}
