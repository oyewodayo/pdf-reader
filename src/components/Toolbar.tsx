import { usePDFContext } from '../context/PDFContext';
import { Button, Typography, Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { ViewModule, ViewStream } from '@mui/icons-material';

interface ToolbarProps {
  viewMode?: 'single' | 'all';
  onViewModeChange?: (mode: 'single' | 'all') => void;
}

export default function Toolbar({ viewMode = 'single', onViewModeChange }: ToolbarProps) {
  const { currentPage, numPages, setCurrentPage } = usePDFContext();

  const handlePreviousPage = () => {
    const newPage = Math.max(1, currentPage - 1);
    setCurrentPage(newPage);
  };

  const handleNextPage = () => {
    const maxPage = numPages || 1;
    const newPage = Math.min(maxPage, currentPage + 1);
    setCurrentPage(newPage);
  };

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'single' | 'all' | null,
  ) => {
    if (newMode !== null && onViewModeChange) {
      onViewModeChange(newMode);
    }
  };

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      justifyContent="space-between" 
      gap={2} 
      my={2}
      px={2}
    >
      {/* Navigation Controls - Only show in single page mode */}
      <Box display="flex" alignItems="center" gap={2}>
        {viewMode === 'single' && (
          <>
            <Button
              variant="contained"
              disabled={currentPage <= 1}
              onClick={handlePreviousPage}
            >
              Previous
            </Button>

            <Typography variant="body1" sx={{ minWidth: '120px', textAlign: 'center' }}>
              Page {currentPage} of {numPages || '--'}
            </Typography>

            <Button
              variant="contained"
              disabled={currentPage >= (numPages || 1)}
              onClick={handleNextPage}
            >
              Next
            </Button>
          </>
        )}
        
        {viewMode === 'all' && (
          <Typography variant="body1" sx={{ minWidth: '120px', textAlign: 'center' }}>
            Viewing all {numPages || '--'} pages
          </Typography>
        )}
      </Box>

      {/* View Mode Toggle */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="body2" color="text.secondary">
          View:
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          aria-label="view mode"
          size="small"
        >
          <ToggleButton value="single" aria-label="single page view">
            <ViewModule sx={{ mr: 1 }} />
            Single
          </ToggleButton>
          <ToggleButton value="all" aria-label="all pages view">
            <ViewStream sx={{ mr: 1 }} />
            All Pages
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
}