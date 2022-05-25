import React, { useState } from "react";
import {
  MainLayoutNavbarProps,
  MainLayoutProps,
} from "../types/ProductLayout.types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "app/components/Checkbox";
import Grid from "@mui/material/Grid";
import { Link, useLocation } from "react-router-dom";
import MaterialLink from "@mui/material/Link";
import { Button } from "@mui/material";
import { AppRoute } from "app/routing/AppRoute.enum";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const NavBar = ({
  onSearch,
  onActiveFilterChange,
  onPromoFilterChange,
  defaultSearchValue,
  defaultActiveValue,
  defaultPromoValue,
}: MainLayoutNavbarProps) => {
  const localisation = useLocation();
  const pathName = localisation.pathname;

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [searchText, setSearchText] = useState("");
  const isAuthenticated = false;

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchText);
  };

  const handleActiveCheckbox = (value: boolean) => onActiveFilterChange(value);
  const handlePromoCheckbox = (value: boolean) => onPromoFilterChange(value);

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "white",
        minHeight: "144px",
        py: 2,
        display: "flex",
        justifyContent: "center",
      }}
      elevation={0}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            flexWrap: "wrap",
            display: "flex",
          }}
        >
          <Grid container alignItems="center" rowGap={2}>
            <Grid item xs={4} sm={2}>
              <Typography variant="h1" sx={{ fontSize: "24px" }}>
                <MaterialLink
                  {...(AppRoute.Home !== pathName
                    ? {
                        component: Link,
                        to: AppRoute.Home,
                      }
                    : {})}
                  sx={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  join.tsh.io
                </MaterialLink>
              </Typography>
            </Grid>
            <Grid
              item
              xs={8}
              sm={10}
              md={2}
              justifySelf="end"
              order={{
                md: 4,
              }}
            >
              <Box display="flex" justifyContent="flex-end">
                {isAuthenticated ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                          <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                ) : (
                  <Button variant="outlined" sx={{ textTransform: "none" }}>
                    Log in
                  </Button>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} sm={8} md={4}>
              <form onSubmit={handleSearch}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInput
                    fullWidth
                    placeholder="Search"
                    size="small"
                    defaultValue={defaultSearchValue}
                    sx={(theme) => ({
                      "& input::placeholder": {
                        color: theme.myColor.black.main,
                        opacity: 1,
                      },
                      "& fieldset": {
                        borderColor: theme.myColor.grey?.light,
                      },
                      "& fieldset:focus": {
                        borderColor: theme.palette.primary.main,
                      },
                    })}
                    onChange={(e) => setSearchText(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Search for product"
                          type="submit"
                          edge="end"
                          data-testid="navbar__product__search-button"
                        >
                          <SearchIcon
                            sx={(theme) => ({
                              color: theme.myColor.black.main,
                            })}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </form>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box
                display="flex"
                ml={{
                  sm: 2,
                }}
              >
                <Checkbox
                  label="Active"
                  onChange={handleActiveCheckbox}
                  defaultChecked={defaultActiveValue}
                />
                <Checkbox
                  label="Promo"
                  onChange={handlePromoCheckbox}
                  defaultChecked={defaultPromoValue}
                />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

const ProductLayout = ({
  children,
  onSearch,
  onActiveFilterChange,
  onPromoFilterChange,
  defaultSearchValue,
  defaultActiveValue,
  defaultPromoValue,
}: MainLayoutProps) => {
  console.log(defaultActiveValue);
  console.log(defaultPromoValue);
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <NavBar
        onSearch={onSearch}
        onActiveFilterChange={onActiveFilterChange}
        onPromoFilterChange={onPromoFilterChange}
        defaultSearchValue={defaultSearchValue}
        defaultActiveValue={defaultActiveValue}
        defaultPromoValue={defaultPromoValue}
      />
      <Box
        flexGrow={1}
        sx={(theme) => ({
          bgcolor: theme.palette.secondary.main,
        })}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ProductLayout;
