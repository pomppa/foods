import ResponsiveDrawer from './responsive-drawer';
import { Box } from '@mui/system';

export default function Layout({ children }) {
  return (
    <>
      <ResponsiveDrawer />
      <Box sx={{ ml: '50px', mr: '50px', mb: '50px' }}>
        <main>{children}</main>
      </Box>
    </>
  );
}
