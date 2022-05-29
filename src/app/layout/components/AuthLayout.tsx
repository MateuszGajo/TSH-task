import { Box, Typography } from "@mui/material";
import photo from "assets/images/authImage.jpg";
import { AuthLayoutProps } from "../types/AuthLayout.types";

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box width="100%" height="100vh" display="flex">
      <Box width="30vw" minWidth="250px" display={{ xs: "none", sm: "flex" }}>
        <Box
          display="flex"
          height="100%"
          maxHeight="100%"
          width="100%"
          component="img"
          alt="mountain landscape"
          lineHeight={0}
          src={photo}
          sx={{ objectFit: "cover" }}
        />
      </Box>
      <Box flexGrow={1}>
        <Box
          display="flex"
          height="100%"
          flexDirection="column"
          position="relative"
          maxWidth="500px"
          ml={{
            xs: 3,
            sm: 5,
            md: 6,
            lg: 18,
          }}
          mr={{
            xs: 2,
            sm: 5,
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: "24px",
              position: "absolute",
              top: "40px",
              left: 0,
            }}
          >
            join.tsh.io
          </Typography>
          <Box my="auto">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
