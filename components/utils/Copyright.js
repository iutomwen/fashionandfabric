import Typography from "@mui/material/Typography";
import { APPNAME } from "../../libs/constant";
export default function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {APPNAME} {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
