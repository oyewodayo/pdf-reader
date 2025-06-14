// src/pdfWorker.ts
import { PDFWorker } from 'pdfjs-dist';
import PdfJsWorker from 'pdfjs-dist/build/pdf.worker?worker';

export const pdfWorkerInstance = new PDFWorker({
  port: new PdfJsWorker()
});
