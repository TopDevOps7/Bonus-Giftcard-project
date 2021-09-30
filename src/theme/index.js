import { createTheme } from "@material-ui/core/styles";
// import { orange } from '@material-ui/core/colors';
import { palette, colorPalette } from "./options";

const theme = createTheme({
  colorPalette,
  palette,
});

export default theme;
