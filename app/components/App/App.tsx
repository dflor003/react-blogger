import * as React from 'react';
import {Component, PropTypes} from 'react';

import Layout from '../Layout/Layout';

export default class App extends Component<any, any> {
  static propTypes = {
    children: PropTypes.node
  };

	render() {
		return (
			<Layout>
        {this.props.children}
      </Layout>
		);
	}
}
