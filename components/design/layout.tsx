import ResponsiveDrawer from "./responsive-drawer";
import { Box } from "@mui/system";

export default function Layout({ children }) {
  return (
    <>
      <ResponsiveDrawer />
      <Box sx={{ ml: "275px" }}>
        <main>{children}</main>
      </Box>
    </>
  );
}
