import * as React from 'react';
import {Component, PropTypes} from 'react';
import {RouterOnContext, Link} from 'react-router';

export class NavLink extends Component<any, any> {
  static propTypes = {
    to: PropTypes.string
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const router: RouterOnContext = this.context.router;
    const isActive = router.isActive(this.props.to, true);
    const className = isActive ? 'active' : '';

    return (
      <li className={className}>
        <Link {...this.props} />
      </li>
    );
  }
}
