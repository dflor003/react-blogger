import * as React from 'react';
import { Component, PropTypes } from 'react';
import { AuthService } from '../../services/AuthService';
import { ButtonToolbar, Button } from 'react-bootstrap';
import * as styles from './Login.scss';

export default class Login extends Component<any, any> {
  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  render() {
    const { auth } = this.context;
    console.log(this.context);
    return (
      <div className={styles.root}>
        <fieldset className={styles.loginForm}>
          <legend className={styles.loginTitle}>Login</legend>

          <p className={styles.instructions}>
            Welcome! Please sign in to post blog entries and comment.
          </p>

          <Button bsStyle="primary" block={true} onClick={() => auth.login()}>Login</Button>
          <Button bsStyle="link" block={true}>Not a member?</Button>
        </fieldset>
      </div>
    )
  }
}
