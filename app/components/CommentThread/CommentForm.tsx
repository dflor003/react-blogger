import * as React from 'react';
import {Component, PropTypes} from 'react';
import {Col, Row, Image, Form, Button, FormGroup} from 'react-bootstrap';
import Card from '../Card/Card';
import logger from '../../../server/utils/logger/logger';

interface CommentThreadProps {
  profilePicUrl: string;
  onCommented: (content: string) => void;
}

const log = logger('COMMENT-FORM');
export default class CommentForm extends Component<CommentThreadProps, any> {
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
    const { profilePicUrl } = this.props;
    const onCommented = this.props.onCommented || (() => ({}));

    return (
      <Card depth={2}>
        <Form onSubmit={(evt) => {
          onCommented(this.state.comment);
          evt.preventDefault();
        }}>
          <Row>
            <Col sm={3}>
              <div className="text-center" >
                <Image src={profilePicUrl} style={{width: '120px', height: '120px', marginLeft: 'auto', marginRight: 'auto'}} responsive circle/>
              </div>
            </Col>
            <Col sm={9}>
              <FormGroup>
                <label htmlFor="commentBox">Leave a comment</label>
                <textarea
                  id="commentBox"
                  className="form-control"
                  rows={4}
                  placeholder="Leave a comment..."
                  value={this.state.comment}
                  onChange={(evt: any) => this.setState({ comment: evt.target.value })}/>
              </FormGroup>
              <div className="text-right">
                <Button type="submit" bsStyle="primary" bsSize="sm">Submit</Button>
                <Button type="button" bsStyle="danger" bsSize="sm" onClick={() => this.setState({ comment: '' })}>Reset</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card>
    );
  }
}
