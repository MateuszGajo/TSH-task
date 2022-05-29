import { Button, IconButton, List, ListItem } from "@mui/material";
import usePagination from "app/hooks/usePagination";
import React from "react";
import { PaginationProps } from "./Pagination.props";

const Pagination = ({
  page,
  siblingCount = 1,
  onChange,
  hideNextButton = false,
  hidePrevButton = false,
  count,
  boundaryCount = 3,
  showFirstButton,
  showLastButton,
}: PaginationProps) => {
  const { items } = usePagination({
    boundaryCount,
    siblingCount,
    page,
    count,
    hideNextButton,
    hidePrevButton,
    showFirstButton,
    showLastButton,
    onChange,
  });

  return (
    <List
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {items.map(({ page, type, selected, ...item }, index) => {
        let children = null;

        if (type === "start-ellipsis" || type === "end-ellipsis") {
          children = "…";
        } else if (type === "page") {
          children = (
            <IconButton
              type="button"
              sx={(theme) => ({
                color: selected
                  ? theme.palette.primary.main
                  : theme.myColor.black.main,
                fontWeight: selected ? "bold" : undefined,
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                fontSize: "15px",
              })}
              {...item}
            >
              {page}
            </IconButton>
          );
        } else {
          children = (
            <Button
              type="button"
              {...item}
              sx={(theme) => ({
                color: theme.myColor.black.main,
                "&.Mui-disabled": {
                  color: theme.myColor.grey.dark,
                },
                mr: type === "first" ? 1 : 0,
                ml: type === "last" ? 1 : 0,
                textTransform: "capitalize",
              })}
            >
              {type}
            </Button>
          );
        }

        return (
          <ListItem key={index} sx={{ px: 0.5, width: "auto" }}>
            {children}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Pagination;
