import * as React from 'react';
import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { AuthService } from '../../services/AuthService';
import { ButtonToolbar, Button } from 'react-bootstrap';
import styles from './LoginStatus.scss';

interface ILoginStatusProps {
  auth: AuthService;
}

const loggedInComponent = (userName: string) => (
  <li className="dropdown">
    <a href="#"
       className="dropdown-toggle"
       data-toggle="dropdown"
       role="button">
      Welcome {userName}! <span className="caret" />
    </a>
    <ul className="dropdown-menu">
      <li role="separator" className="divider" />
      <li><Link to="/logout">Logout</Link></li>
    </ul>
  </li>
);

const loggedOutComponent = () => (
  <li>
    <Link to="/login">Sign in</Link>
  </li>
);

export default class LoginStatus extends Component<ILoginStatusProps, any> {
  static propTypes = {
    auth: PropTypes.instanceOf(AuthService)
  };

  render() {
    const auth = this.props.auth;
    const isLoggedIn = auth.isLoggedIn();
    return isLoggedIn ? loggedInComponent(auth.username()) : loggedOutComponent();
  }
}
