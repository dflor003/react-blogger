import * as React from 'react';
import * as styles from './Login.scss';
import { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
import { MdLockOpen } from 'react-icons/lib/md';

import AuthService from '../../services/AuthService';

export default class Login extends Component<any, any> {
  static propTypes = {
    params: PropTypes.shape({
      error: PropTypes.string,
      errorDescription: PropTypes.string
    })
  };

  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  render() {
    const { auth } = this.context;
    const query = this.props.location.query || {};
    const hasError = !!query.error;

    return (
      <div className={styles.root}>
        <fieldset className={styles.loginForm}>
          <legend className={styles.loginTitle}>Login</legend>
          {
            hasError && (
              <Alert bsStyle="danger">
                <h4>Error signing in!</h4>
                <p>{query.errorDescription}</p>
              </Alert>
            )
          }

          <p className={styles.instructions}>
            Welcome! Please sign in to post blog entries and comment.
          </p>

          <div className={styles.loginLogo}>
            <img src="https://cdn.auth0.com/styleguide/1.0.0/img/badge.svg"/>
          </div>

          <Button bsStyle="primary" block={true} onClick={() => auth.login()}>
            <MdLockOpen size="2rem"/> Login or Sign up
          </Button>
        </fieldset>
      </div>
    )
  }
}
