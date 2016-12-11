import * as React from 'react';
import * as DocumentTitle from 'react-document-title';
import { Component } from 'react';

export default class Home extends Component<any, any> {
  render() {
    const userName = 'Bob';

    return (
      <DocumentTitle title="Home">
        <div>
          <h1>Welcome {userName}!</h1>
          <p>Here's where you'll see all of your stuff.</p>
        </div>
      </DocumentTitle>
    );
  }
}
