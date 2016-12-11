import * as React from 'react';
import { Component, PropTypes } from 'react';
import { MenuItem } from 'react-bootstrap';
import { hashHistory } from 'react-router';

interface MenuItemLinkProps {
  to: string;
}

const history = hashHistory;

export default class MenuItemLink extends Component<MenuItemLinkProps, void> {
  static propTypes = {
    to: PropTypes.string.isRequired
  };

  render() {
    const props = this.props;
    const {to} = props;
    const onClick = () => history.replace(to);

    return (
      <MenuItem onClick={onClick} {...props} />
    );
  }
}
