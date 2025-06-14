import { useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { pdfWorkerInstance } from '../pdfWorker';
import { usePDFContext } from '../context/PDFContext';

export default function PDFViewer() {
  const { pdfFile, currentPage, setNumPages, setError, setIsRendering } = usePDFContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!pdfFile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const loadPDF = async () => {
      setIsRendering(true);
      setError(null);

      try {
        
        const loadingTask = pdfjsLib.getDocument({
          url: URL.createObjectURL(pdfFile),
          worker: pdfWorkerInstance // ✅
        });

        const pdf = await loadingTask.promise;
        setNumPages(pdf.numPages);

        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: canvas.getContext('2d')!,
          viewport
        }).promise;
      } catch (err) {
        // setError('Failed to load PDF. Please try another file.');
        console.error('PDF error:', err);
      } finally {
        setIsRendering(false);
      }
    };

    loadPDF();
  }, [pdfFile, currentPage]);

  return <canvas ref={canvasRef} />;
}
