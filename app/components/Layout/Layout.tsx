import * as React from 'react';

export default class Layout extends React.Component<any, any> {
  static propTypes = {
    children: React.PropTypes.node
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
                <span className="icon-bar" />
                <span className="icon-bar" />
                <span className="icon-bar" />
              </button>

              <a className="navbar-brand">
                {appName}
              </a>
            </div>

            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li className="active">
                  <a>Home</a>
                </li>
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
