import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

interface PDFContextType {
  pdfFile: File | null;
  setPDFFile: (file: File | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numPages: number;
  setNumPages: (pages: number) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isRendering: boolean;
  setIsRendering: (rendering: boolean) => void;
}

const PDFContext = createContext<PDFContextType | undefined>(undefined);

export function PDFProvider({ children }: { children: ReactNode }) {
  const [pdfFile, setPDFFile] = useState<File | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isRendering, setIsRendering] = useState(false);

  return (
    <PDFContext.Provider value={{
      pdfFile,
      setPDFFile,
      currentPage,
      setCurrentPage,
      numPages,
      setNumPages,
      error,
      setError,
      isRendering,
      setIsRendering
    }}>
      {children}
    </PDFContext.Provider>
  );
}

export function usePDFContext() {
  const context = useContext(PDFContext);
  if (context === undefined) {
    throw new Error('usePDFContext must be used within a PDFProvider');
  }
  return context;
}