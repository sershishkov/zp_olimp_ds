import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import theme from './ui/Theme';
import { loadUser } from './store/actions/user/auth/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';

import Container from '@material-ui/core/Container';
import { ThemeProvider } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Alert from './components/Alert';
import Header from './ui/Header';
import Footer from './ui/Footer';

import Landing from './pages/ourFace/Landing';
import About from './pages/ourFace/About';
import Asfalt from './pages/ourFace/Asfalt';
import Electro from './pages/ourFace/Electro';
import GroundFloorStormWater from './pages/ourFace/GroundFloorStormWater';
import HighAltitudeWork from './pages/ourFace/HighAltitudeWork';
import PlumbingWork from './pages/ourFace/PlumbingWork';
import PorchAndVisors from './pages/ourFace/PorchAndVisors';
import RepairOfEntrance from './pages/ourFace/RepairOfEntrances';
import RoofingWork from './pages/ourFace/RoofingWork';
import SteelStructures from './pages/ourFace/SteelStructures';
import WindowsDoorPlastic from './pages/ourFace/WindowDoorPlastic';
import Login from './pages/users/auth/Login';
import Register from './pages/users/auth/Register';

const UserAdmin = lazy(() => import('./pages/users/admin/UserAdmin'));
const UserAdminAdd = lazy(() => import('./pages/users/admin/UserAdminAdd'));
const UserAdminEdit = lazy(() => import('./pages/users/admin/UserAdminEdit'));
const UserEditDetail = lazy(() => import('./pages/users/auth/UserEditDetail'));

const GroupOf_MenuLinks = lazy(() =>
  import('./pages/menuLinks/GroupOf_MenuLinks')
);
const GroupOf_MenuLinksAdd = lazy(() =>
  import('./pages/menuLinks/GroupOf_MenuLinksAdd')
);
const GroupOf_MenuLinksEdit = lazy(() =>
  import('./pages/menuLinks/GroupOf_MenuLinksEdit')
);

const MenuLink = lazy(() => import('./pages/menuLinks/MenuLink'));
const MenuLinkAdd = lazy(() => import('./pages/menuLinks/MenuLinkAdd'));
const MenuLinkEdit = lazy(() => import('./pages/menuLinks/MenuLinkEdit'));

const ReferDataDashboard = lazy(() =>
  import('./pages/referenceData/ReferDataDashboard')
);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 70,
    padding: 0,
    paddingTop: '1em',
    // border: '1px solid blue',
  },
}));

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Container maxWidth='lg' className={classes.root}>
            <Alert />
            <Suspense fallback={<CircularProgress />}>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/about' component={About} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />

                <Route exact path='/asfalt' component={Asfalt} />
                <Route exact path='/electro' component={Electro} />
                <Route
                  exact
                  path='/ground-floor-storm-water'
                  component={GroundFloorStormWater}
                />
                <Route
                  exact
                  path='/high-altitude-work'
                  component={HighAltitudeWork}
                />
                <Route exact path='/plumbing-work' component={PlumbingWork} />
                <Route
                  exact
                  path='/porch-and-visors'
                  component={PorchAndVisors}
                />
                <Route
                  exact
                  path='/repair-of-entrance'
                  component={RepairOfEntrance}
                />
                <Route exact path='/roofing-work' component={RoofingWork} />
                <Route
                  exact
                  path='/steel-structures'
                  component={SteelStructures}
                />
                <Route
                  exact
                  path='/windows-door-plastic'
                  component={WindowsDoorPlastic}
                />

                <PrivateRoute exact path='/user-admin' component={UserAdmin} />
                <PrivateRoute
                  exact
                  path='/user-admin/add'
                  component={UserAdminAdd}
                />
                <PrivateRoute
                  exact
                  path='/user-admin/:id'
                  component={UserAdminEdit}
                />
                <PrivateRoute
                  exact
                  path='/user-detail'
                  component={UserEditDetail}
                />

                <PrivateRoute
                  exact
                  path='/group-menu-links'
                  component={GroupOf_MenuLinks}
                />
                <PrivateRoute
                  exact
                  path='/group-menu-links/add'
                  component={GroupOf_MenuLinksAdd}
                />
                <PrivateRoute
                  exact
                  path='/group-menu-links/:id'
                  component={GroupOf_MenuLinksEdit}
                />
                <PrivateRoute exact path='/menu-links' component={MenuLink} />
                <PrivateRoute
                  exact
                  path='/menu-links/add'
                  component={MenuLinkAdd}
                />
                <PrivateRoute
                  exact
                  path='/menu-links/:id'
                  component={MenuLinkEdit}
                />
                <PrivateRoute
                  exact
                  path='/reference-data'
                  component={ReferDataDashboard}
                />
              </Switch>
            </Suspense>
          </Container>
          <Footer />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
