import * as React from 'react';
import {Component, PropTypes} from 'react';
import {RouterOnContext, Link} from 'react-router';

export interface NavLinkProps {
  to: string;
  visible?: boolean;
}

export default class NavLink extends Component<NavLinkProps, any> {
  static propTypes = {
    to: PropTypes.string.isRequired,
    visible: PropTypes.bool
  };

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    const router: RouterOnContext = this.context.router;
    const isActive = router.isActive(this.props.to, true);
    const className = isActive ? 'active' : '';
    const { visible, ...others } = this.props;

    if (visible === false) {
      return null;
    }

    return (
      <li className={className}>
        <Link {...others} />
      </li>
    );
  }
}
