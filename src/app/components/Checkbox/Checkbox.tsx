import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import MaterialCheckBox from "@mui/material/Checkbox";
import CheckIcon from "@mui/icons-material/Check";
import { CheckboxProps as ComponentProps } from "./Checkbox.props";

const Checkbox = (props: ComponentProps) => {
  return (
    <FormControlLabel
      sx={{
        "& 	.MuiFormControlLabel-label": {
          fontSize: 15,
          fontWeight: 600,
        },
        borderWidth: 5,
        color: "black",
        ...props.sx,
      }}
      control={
        <MaterialCheckBox
          onChange={(e) => {
            props.onChange(e.target.checked);
          }}
          checked={props.defaultChecked}
          icon={
            <Box
              width="24px"
              height="24px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width="24px"
                height="24px"
                border="1px solid #E0E2EA"
                borderRadius="4px"
              />
            </Box>
          }
          checkedIcon={
            <Box
              width="24px"
              height="24px"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box
                width="24px"
                height="24px"
                border="1px solid #E0E2EA"
                borderRadius="4px"
                fontSize="11px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  bgcolor: "primary.main",
                }}
              >
                <CheckIcon
                  style={{
                    fontSize: "17px",
                  }}
                  fontSize={"inherit"}
                  sx={{
                    fontSize: 10,
                    color: "white",
                  }}
                />
              </Box>
            </Box>
          }
        />
      }
      label={props.label}
    />
  );
};

export default Checkbox;
