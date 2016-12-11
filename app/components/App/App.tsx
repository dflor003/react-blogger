import * as React from 'react';
import { Component, PropTypes } from 'react';

import Layout from '../Layout/Layout';
import { AuthService } from '../../services/AuthService';

export default class App extends Component<any, any> {
  static propTypes = {
    children: PropTypes.node
  };

  static childContextTypes = {
    auth: PropTypes.instanceOf(AuthService)
  };

  getChildContext() {
    const clientId = '6PCPeiJR2EVqk2wf9QwiQ6eIEUBUc8hN';
    const domain = 'danilf.auth0.com';
    return {
      auth: new AuthService(clientId, domain)
    }
  }

  render() {
    return (
      <Layout>
        {this.props.children}
      </Layout>
    );
  }
}
