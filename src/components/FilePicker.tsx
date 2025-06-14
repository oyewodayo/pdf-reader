import { useDropzone } from 'react-dropzone';
import { usePDFContext } from '../context/PDFContext';
import { Box, Typography } from '@mui/material';

export default function FilePicker() {
  const { pdfFile, setPDFFile } = usePDFContext();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'application/pdf': ['.pdf']},
    maxFiles: 1,
    onDrop: (acceptedFiles: File[]) => {
      setPDFFile(acceptedFiles[0]);
    },
  });

  return (
    <Box {...getRootProps()} sx={{
      border: '2px dashed',
      borderColor: 'primary.main',
      borderRadius: 2,
      p: 4,
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: pdfFile ? 'action.hover' : 'background.paper',
      '&:hover': {
        backgroundColor: 'action.hover',
      }
    }}>
      <input {...getInputProps()} />
      {pdfFile ? (
        <Typography variant="body1">
          Selected: <strong>{pdfFile.name}</strong>
          <br />
          <Typography variant="caption" color="text.secondary">
            Click or drag to replace
          </Typography>
        </Typography>
      ) : (
        <Typography variant="body1">
          Drag & drop a PDF here, or click to select
        </Typography>
      )}
    </Box>
  );
}