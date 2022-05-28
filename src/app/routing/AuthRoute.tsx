import { CircularProgress } from "@mui/material";
import { useAuthenticationStore } from "app/providers/RootStoreProvider";
import { observer } from "mobx-react-lite";
import { Redirect, Route, RouteProps } from "react-router-dom";

interface Props extends RouteProps {
  children: React.ReactNode;
}

const AuthRoute = ({ children, ...rest }: Props) => {
  const { user, isUserLoading } = useAuthenticationStore();
  return (
    <Route
      {...rest}
      render={() => {
        return isUserLoading ? (
          <CircularProgress
            sx={(theme) => ({
              color: theme.palette.primary.main,
              display: "flex",
              mx: "auto",
              mt: 2,
            })}
            data-testid="product__loading"
          />
        ) : !user ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default observer(AuthRoute);
