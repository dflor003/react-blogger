import * as React from 'react';
import * as DocumentTitle from 'react-document-title';
import { Component, PropTypes } from 'react';

import Layout from '../Layout/Layout';
import AuthService from '../../services/AuthService';

export default class App extends Component<any, any> {
  static propTypes = {
    children: PropTypes.node
  };

  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService)
  };

  render() {
    const appTitle = 'React Blogger';
    const auth = this.context.auth;

    return (
      <DocumentTitle title={appTitle}>
        <Layout appName={appTitle} auth={auth}>
          {this.props.children}
        </Layout>
      </DocumentTitle>
    );
  }
}
