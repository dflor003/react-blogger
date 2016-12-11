import * as React from 'react';
import * as DocumentTitle from 'react-document-title';
import { Component, PropTypes } from 'react';

import Layout from '../Layout/Layout';

export default class App extends Component<any, any> {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const appTitle = 'React Blogger';
    console.log('App', this.props);

    return (
      <DocumentTitle title={appTitle}>
        <Layout appName={appTitle}>
          {this.props.children}
        </Layout>
      </DocumentTitle>
    );
  }
}
