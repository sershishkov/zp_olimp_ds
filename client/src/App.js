import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import ruLocale from 'date-fns/locale/ru';
// import enLocale from 'date-fns/locale/en-US';
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

const Worker = lazy(() => import('./pages/referenceData/worker/Worker'));
const WorkerAdd = lazy(() => import('./pages/referenceData/worker/WorkerAdd'));

const WorkerEdit = lazy(() =>
  import('./pages/referenceData/worker/WorkerEdit')
);

const Unit = lazy(() => import('./pages/referenceData/unit/Unit'));
const UnitAdd = lazy(() => import('./pages/referenceData/unit/UnitAdd'));
const UnitEdit = lazy(() => import('./pages/referenceData/unit/UnitEdit'));

const TypeFirm = lazy(() => import('./pages/referenceData/typeFirm/TypeFirm'));
const TypeFirmAdd = lazy(() =>
  import('./pages/referenceData/typeFirm/TypeFirmAdd')
);
const TypeFirmEdit = lazy(() =>
  import('./pages/referenceData/typeFirm/TypeFirmEdit')
);

const ServiceJob = lazy(() =>
  import('./pages/referenceData/serviceJob/ServiceJob')
);
const ServiceJobAdd = lazy(() =>
  import('./pages/referenceData/serviceJob/ServiceJobAdd')
);
const ServiceJobEdit = lazy(() =>
  import('./pages/referenceData/serviceJob/ServiceJobEdit')
);

const Product = lazy(() => import('./pages/referenceData/product/Product'));
const ProductAdd = lazy(() =>
  import('./pages/referenceData/product/ProductAdd')
);
const ProductEdit = lazy(() =>
  import('./pages/referenceData/product/ProductEdit')
);

const GroupServiceJob = lazy(() =>
  import('./pages/referenceData/groupServiceJob/GroupServiceJob')
);
const GroupServiceJobAdd = lazy(() =>
  import('./pages/referenceData/groupServiceJob/GroupServiceJobAdd')
);
const GroupServiceJobEdit = lazy(() =>
  import('./pages/referenceData/groupServiceJob/GroupServiceJobEdit')
);

const GroupProduct = lazy(() =>
  import('./pages/referenceData/groupProduct/GroupProduct')
);
const GroupProductAdd = lazy(() =>
  import('./pages/referenceData/groupProduct/GroupProductAdd')
);
const GroupProductEdit = lazy(() =>
  import('./pages/referenceData/groupProduct/GroupProductEdit')
);

const GroupExpense = lazy(() =>
  import('./pages/referenceData/groupExpense/GroupExpense')
);
const GroupExpenseAdd = lazy(() =>
  import('./pages/referenceData/groupExpense/GroupExpenseAdd')
);
const GroupExpenseEdit = lazy(() =>
  import('./pages/referenceData/groupExpense/GroupExpenseEdit')
);

const Firm = lazy(() => import('./pages/referenceData/firm/Firm'));
const FirmAdd = lazy(() => import('./pages/referenceData/firm/FirmAdd'));
const FirmEdit = lazy(() => import('./pages/referenceData/firm/FirmEdit'));

const Expense = lazy(() => import('./pages/accountant/expenses/Expense'));
const ExpenseAdd = lazy(() => import('./pages/accountant/expenses/ExpenseAdd'));
const ExpenseEdit = lazy(() =>
  import('./pages/accountant/expenses/ExpenseEdit')
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

// const localeMap = {
//   en: enLocale,
//   ru: ruLocale,
// };

function App() {
  const classes = useStyles();
  // const [locale, setLocale] = useState('ru');

  useEffect(() => {
    if (localStorage.token) {
      store.dispatch(loadUser());
    }
  }, []);

  return (
    <MuiPickersUtilsProvider
      utils={DateFnsUtils}
      // locale={localeMap[locale]}
      locale={ruLocale}
    >
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

                  <PrivateRoute
                    exact
                    path='/user-admin'
                    component={UserAdmin}
                  />
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
                    path='/reference-data/worker'
                    component={Worker}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/worker/add'
                    component={WorkerAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/worker/:id'
                    component={WorkerEdit}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/unit'
                    component={Unit}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/unit/add'
                    component={UnitAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/unit/:id'
                    component={UnitEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/type-firm'
                    component={TypeFirm}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/type-firm/add'
                    component={TypeFirmAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/type-firm/:id'
                    component={TypeFirmEdit}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/service-job'
                    component={ServiceJob}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/service-job/add'
                    component={ServiceJobAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/service-job/:id'
                    component={ServiceJobEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/product'
                    component={Product}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/product/add'
                    component={ProductAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/product/:id'
                    component={ProductEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/group-service-job'
                    component={GroupServiceJob}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/group-service-job/add'
                    component={GroupServiceJobAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/group-service-job/:id'
                    component={GroupServiceJobEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/group-product'
                    component={GroupProduct}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/group-product/add'
                    component={GroupProductAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/group-product/:id'
                    component={GroupProductEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/group-expense'
                    component={GroupExpense}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/group-expense/add'
                    component={GroupExpenseAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/group-expense/:id'
                    component={GroupExpenseEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/reference-data/firm'
                    component={Firm}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/firm/add'
                    component={FirmAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/reference-data/firm/:id'
                    component={FirmEdit}
                  />

                  <PrivateRoute
                    exact
                    path='/accountant/expenses/expense'
                    component={Expense}
                  />
                  <PrivateRoute
                    exact
                    path='/accountant/expenses/expense/add'
                    component={ExpenseAdd}
                  />
                  <PrivateRoute
                    exact
                    path='/accountant/expenses/expense/:id'
                    component={ExpenseEdit}
                  />
                </Switch>
              </Suspense>
            </Container>
            <Footer />
          </Router>
        </ThemeProvider>
      </Provider>
    </MuiPickersUtilsProvider>
  );
}

export default App;
