import { usePDFContext } from '../context/PDFContext';
import { Button, Typography, Box } from '@mui/material';

export default function Toolbar() {
  const { currentPage, numPages, setCurrentPage } = usePDFContext();

  const handlePreviousPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    const maxPage = numPages || 1; // Use 1 if numPages is not yet available
    const newPage = Math.min(maxPage, currentPage + 1);
    setCurrentPage(newPage);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2} my={2}>
      <Button
        variant="contained"
        disabled={currentPage <= 1}
        onClick={handlePreviousPage} // Call the helper function
      >
        Previous
      </Button>

      <Typography variant="body1">
        Page {currentPage} of {numPages || '--'}
      </Typography>

      <Button
        variant="contained"
        disabled={currentPage >= (numPages || 1)}
        onClick={handleNextPage} // Call the helper function
      >
        Next
      </Button>
    </Box>
  );
}