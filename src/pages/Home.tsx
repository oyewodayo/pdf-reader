import FilePicker from '../components/FilePicker';
import PDFViewer from '../components/PDFViewer';
import Toolbar  from '../components/Toolbar';
import { usePDFContext } from '../context/PDFContext';
import { Box, Container, Typography, Alert, CircularProgress } from '@mui/material';

export default function Home() {
  const { error, isRendering } = usePDFContext();
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        PDF Reader
      </Typography>

      {/* Temporary test element */}
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white', mb: 2 }}>
        Visibility Test - You should see this
      </Box>

      <FilePicker />

      <Toolbar />

      {/* Error Display */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* PDF Viewer with Loading State */}
      <Box sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        overflow: 'hidden',
        mt: 2,
        minHeight: '500px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        bgcolor: 'background.paper'
      }}>
        {isRendering ? <CircularProgress /> : <PDFViewer />}
      </Box>

      <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
        Developed by <a href="https://x.xom/oyewodayo"> Temidayo</a> using PDF.js
      </Typography>
    </Container>
  );
}