import { SxProps, Theme } from "@mui/material";

export interface CheckboxProps {
  label: string;
  sx?: SxProps<Theme>;
  defaultChecked?: boolean;
  onChange: (value: boolean) => void;
}

