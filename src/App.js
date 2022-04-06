// @flow
import './App.css';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {setAuthLoginRequiredModal} from "./store/auth/auth.actions";
import {ThemeProvider} from "styled-components";
import AppTheme from "./themes";
import LoginPage from "./pages/login/login.pages";
import SignupPage from "./pages/signup/signup.pages";
import PingPongHomePage from "./pages/pingPongHome/pingPongHome.pages";
import AdminDashboardPages from "./pages/adminDashboard/adminDashboard.pages";
import AdmitFormPage from "./pages/admitForm/admit-form.page";
import DefaultPrivateTemplate from "./layouts/default-private-template/default-private-template.layout";
import RedocxComponent from "./components/redocx/redocx.component";


type Props = {

}

function App(props: Props) {


  const PrivateRoute = ({ component: Component, ...rest }) => {
    const isUserLoggedIn = props.isUserLoggedIn;
    return (
        <Route {...rest} render={(props) => {
          return (
              isUserLoggedIn === true
                  ? <Component {...props} />
                  : <Redirect to='/login' />
          )
        }
        } />
    )
  }

  return (
      <ThemeProvider theme={AppTheme.light}>
        <div className="App">
          <Switch>
            <Redirect exact from="/" to="/admitForm" />
            <Route path={['/login', '/signup', '/forgot-password', '/verify-email', '/default', '/pingpong', '/redocx']}>
              {/*<DefaultPublicTemplate>*/}
              <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignupPage} />
                {/*<Route path="/default" component={HomeComponent} />*/}
                {/*<PrivateRoute path="/pingpong" component={PingPongHomePage} />*/}
                <Route path="/dashboard" component={AdminDashboardPages} />
                <Route path="/admitForm" component={AdmitFormPage} />
                <Route path="/redocx" component={RedocxComponent}/>

              </Switch>
              {/*</DefaultPublicTemplate>*/}
            </Route>

              <Route path={['/dashboard', '/admitForm']}>
                  <DefaultPrivateTemplate>
                      <Switch>
                          <Route path="/dashboard" component={AdminDashboardPages} />
                          <Route path="/admitForm" component={AdmitFormPage} />

                      </Switch>
                  </DefaultPrivateTemplate>
              </Route>
          </Switch>


        </div>
      </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginRequiredModal: state.auth.showLoginRequiredModal,
    isUserLoggedIn: state.auth.isUserLoggedIn,
  }
};

const mapDispatchToProps = (dispatch) => ({
  setAuthLoginRequiredModal: (showModal) => dispatch(setAuthLoginRequiredModal(showModal)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
