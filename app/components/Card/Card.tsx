import * as React from 'react';
import * as styles from './Card.scss';
import {Component, PropTypes} from 'react';

interface CardProps {
  depth?: number;
}

export default class Card extends Component<CardProps, void> {
  static propTypes = {
    depth: PropTypes.number,
    children: PropTypes.node
  };

  render() {
    const {depth, children} = this.props;
    const depthClass = typeof depth === 'number'
      ? styles[`card-${Math.min(depth,  5)}`]
      : styles.card;

    return (
      <div className={depthClass}>
        {children}
      </div>
    );
  }
}
