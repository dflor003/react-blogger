import * as React from 'react';
import * as moment from 'moment';
import {Component, PropTypes} from 'react';
import {Col, Row, Image, Form} from 'react-bootstrap';
import Card from '../Card/Card';
import logger from '../../../server/utils/logger/logger';

export interface CommentData {
  id: string;
  datetime: string;
  content: string;
  user: {
    firstName: string;
    lastName: string;
    pictureSmallUrl: string;
  }
}

interface CommentThreadProps {
  comment: CommentData;
}

const log = logger('COMMENT-FORM');
export default class Comment extends Component<CommentThreadProps, any> {
  static propTypes = {
    profilePicUrl: PropTypes.string,
    onCommented: PropTypes.func,
  };

  constructor() {
    super();
    this.state = {
      comment: ''
    };
  }

  render() {
    const { comment } = this.props;
    const thumbnail = comment.user.pictureSmallUrl;
    const fullName = `${comment.user.firstName} ${comment.user.lastName}`;

    return (
      <Card depth={2}>
        <Row>
          <Col sm={3}>
            <div className="text-center" >
              <Image src={thumbnail} style={{width: '64px', height: '64px', marginLeft: 'auto', marginRight: 'auto'}} responsive circle/>
            </div>
          </Col>
          <Col sm={9}>
            <h5>
              {fullName} <br/>
              <small>{moment(comment.datetime).fromNow()}</small>
            </h5>
            <p>{comment.content}</p>
          </Col>
        </Row>
      </Card>
    );
  }
}
