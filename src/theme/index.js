import { createMuiTheme } from "@material-ui/core";
// import { orange } from '@material-ui/core/colors';
import { palette, colorPalette } from "./options";

const theme = createMuiTheme({
  colorPalette,
  palette
});

export default theme;