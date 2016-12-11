import * as React from 'react';
import * as styles from './Register.scss';
import { Component, PropTypes } from 'react';
import { Button } from 'react-bootstrap';

import AuthService from '../../services/AuthService';

export default class Register extends Component<any, any> {
  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  render() {
    const { auth } = this.context;
    return (
      <fieldset className={styles.root}>
        <legend>Register</legend>

        <p className={styles.instructions}>
          Please take the time to fill in a little bit of information
          about yourself.
        </p>

      </fieldset>
    )
  }
}
