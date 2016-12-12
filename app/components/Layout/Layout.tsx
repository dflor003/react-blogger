import * as React from 'react';
import * as styles from './Layout.scss';
import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

import NavLink from '../NavLink/NavLink';
import LoginStatus from '../LoginStatus/LoginStatus';
import AuthService from '../../services/AuthService';

export default class Layout extends Component<any, any> {
  static propTypes = {
    appName: PropTypes.string,
    children: PropTypes.node,
    auth: PropTypes.instanceOf(AuthService)
  };

  render() {
    const appName = this.props.appName;
    const children = this.props.children;
    const auth: AuthService = this.props.auth;

    return (
      <div className={styles.root}>
        <nav className="navbar navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="nav-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>

              <Link className="navbar-brand" to="/home">
                {appName}
              </Link>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/my-posts" visible={auth.isLoggedIn()}>My Posts</NavLink>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <LoginStatus auth={auth}/>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container">
          {children}
        </main>
      </div>
    );
  }
}
