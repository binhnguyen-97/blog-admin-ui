import { useContext, FunctionComponent } from 'react'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'

import AuthContext from 'context/authContext';
import { PAGE_PATH, PAGES } from 'constants/index';

interface ProtectedRouteProps {
  component: FunctionComponent<RouteComponentProps>,
  path?: string,
  exact?: boolean
}

const ProtectedRoute = ({
  component: Component,
  ...otherProps
}: ProtectedRouteProps) => {
  const { authenticated, loaded } = useContext(AuthContext);

  const conditionRenderRoute = (props: RouteComponentProps) => {
    return !authenticated && loaded ? <Redirect to={`${PAGE_PATH[PAGES.LOGIN]}?continue=${window.location.href}`} /> : <Component {...props} />
  };

  return (
    <Route
      {...otherProps}
      render={conditionRenderRoute}
    />
  )
}

export default ProtectedRoute
