import * as React from 'react';
import * as styles from './LoginStatus.scss';
import { Component, PropTypes } from 'react';
import { Link, HistoryBase, hashHistory } from 'react-router';
import { NavDropdown, MenuItem } from 'react-bootstrap';

import AuthService from '../../services/AuthService';
import MenuItemLink from '../MenuItemLink/MenuItemLink';

const loggedInComponent = (username: string, logout: any) => (
  <NavDropdown id='loginStatus' title={`Logged in as ${username}`}>
    <MenuItemLink to="/profile">Profile</MenuItemLink>
    <MenuItem divider />
    <MenuItem onClick={logout}>Logout</MenuItem>
  </NavDropdown>
);

const loggedOutComponent = () => (
  <li>
    <Link to="/login">Sign in</Link>
  </li>
);

interface ILoginStatusProps {
  auth: AuthService;
}

export default class LoginStatus extends Component<ILoginStatusProps, any> {
  static propTypes = {
    auth: PropTypes.instanceOf(AuthService)
  };

  render() {
    const auth = this.props.auth;
    const userProfile = auth.getProfile();
    const isLoggedIn = auth.isLoggedIn() && !!userProfile;
    return isLoggedIn
      ? loggedInComponent(userProfile.username, () => this.logout())
      : loggedOutComponent();
  }

  private logout(): void {
    this.props.auth.logout();
    hashHistory.replace('/login');
  }
}
