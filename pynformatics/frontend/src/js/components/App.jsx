import PropTypes from 'prop-types';
import React from 'react';
import WindowResizeListener from 'react-window-size-listener';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { Debounce } from 'react-throttle';


import Login from './LoginForm';
import Topbar from './Topbar/Topbar';
import Sidebar from './Sidebar/Sidebar';

import StatementPage from '../pages/Statement/Statement';
import MainPage from '../pages/Main/Main';
import Auth from '../pages/Auth/Auth';
import ProblemPage from '../pages/Problem/Problem';
import TempGotoProblemPage from '../pages/TempGotoProblem';

import StatementAdmin from '../pages/StatementAdmin';
import StatementSettingsForm from './StatementSettingsForm';

import * as bootstrapActions from '../actions/bootstrapActions';
import * as userActions from '../actions/userActions';
import * as uiActions from '../actions/uiActions';

import { ThemeProvider } from 'styled-components';
import { Layout } from 'antd';
import theme from '../theme';

import 'antd/dist/antd.css';
import '../isomorphic/containers/App/global.css';
import '../../css/style.css';
import '../../css/ionicons.min.css';


@withRouter
@connect(state => ({
  user: state.user,
}))
export default class App extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
  };

  componentDidMount() {
    this.props.dispatch(bootstrapActions.fetchBootstrap());
  }

  render() {
    const { Content } = Layout;

    return (
      <ThemeProvider theme={theme}>
        <Layout style={{ height: '100vh', background: '#f3f5f7' }}>
          <Debounce time="1000" handler="onResize">
            <WindowResizeListener
              onResize={windowSize => this.props.dispatch(uiActions.windowResize(
                windowSize.windowWidth,
                windowSize.windowHeight
              ))}
            />
          </Debounce>
          <Topbar />
          <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
            <Sidebar />
            <Content
              className="isomorphicContent"
              style={{ height: '100vh', overflowY: 'scroll' }}
            >
              <Switch>
                <Route exact path="/" component={MainPage} />
                <Route path="/auth" component={Auth} />

                <Route exact path="/contest/:statementId" component={StatementPage} />
                <Route exact path="/contest/:statementId/standings" component={StatementPage} />
                <Route exact path="/contest/:statementId/problem/:problemRank" component={StatementPage} />

                <Route exact path="/goto" component={TempGotoProblemPage} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/problem/:problemId" component={ProblemPage} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </ThemeProvider>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       <div>
  //         {
  //           (() => {
  //             const { firstname, lastname } = this.props.user;
  //             if (firstname && lastname) {
  //               return (
  //                 <div>
  //                   Logged in as {firstname} {lastname} &nbsp;
  //                   <button onClick={() => { this.props.dispatch(userActions.logout()); }}>
  //                     logout
  //                   </button>
  //                 </div>
  //               );
  //             }
  //           })()
  //         }
  //       </div>
  //       <div className="main-content">
  //         <Switch>
  //           <Route exact path="/example" component={Example} />
  //           <Route exact path="/statement/:statementId" component={Statement} />
  //           <Route exact path="/statement/:statementId/problem/:problemRank" component={Statement} />
  //           <Route
  //             exact
  //             path="/problem/:problemId"
  //             render={props =>
  //               <Problem {...props} problemId={parseInt(props.match.params.problemId, 10)} />
  //             }
  //           />
  //           <Route exact path="/login" component={Login} />
  //           <Route
  //             exact
  //             path="/admin/statement/:statementId"
  //             render={props =>
  //               (
  //                 <StatementSettingsForm
  //                   {...props}
  //                   statementId={parseInt(props.match.params.statementId, 10)}
  //                 />
  //               )
  //             }
  //           />
  //         </Switch>
  //       </div>
  //     </div>
  //   );
  // }
}
