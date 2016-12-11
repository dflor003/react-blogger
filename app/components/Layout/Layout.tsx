import * as React from 'react';
import { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { NavLink } from '../NavLink/NavLink';

export default class Layout extends Component<any, any> {
  static propTypes = {
    children: PropTypes.node
  };

  render() {
    const appName = 'React Blogger';
    const children = this.props.children;

    return (
      <div>
        <nav className="navbar navbar-inverse" role="navigation">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="nav-collapse">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
                <span className="icon-bar"/>
              </button>

              <Link className="navbar-brand" to="/home">
                {appName}
              </Link>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <NavLink to="/home">Home</NavLink>
              </ul>
            </div>
          </div>
        </nav>

        <main className="container">
          {children}
        </main>
      </div>
    );
  }
}
