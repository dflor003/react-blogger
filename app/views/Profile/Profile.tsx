import * as React from 'react';
import * as styles from './Profile.scss';
import { Component, PropTypes } from 'react';
import { Panel, Image, Form, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap';

import AuthService from '../../services/AuthService';
import logger from '../../../server/utils/logger/logger';

const log = logger('PROFILE');

const lblSize = 3;
const textSize = 12 - lblSize;
const field = (label: string, value: any) => (
  <FormGroup>
    <Col sm={lblSize}>
      <ControlLabel>{label}</ControlLabel>
    </Col>
    <Col sm={textSize}>
      <FormControl.Static>{value}</FormControl.Static>
    </Col>
  </FormGroup>
);

export default class Profile extends Component<any, any> {
  static propTypes = {
    params: PropTypes.shape({
      error: PropTypes.string,
      errorDescription: PropTypes.string
    })
  };

  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  render() {

    const auth: AuthService = this.context.auth;
    const userProfile = auth.getProfile();
    log.info('Loaded with profile', userProfile);


    return (
      <Panel header="Profile" className={styles.root}>
        <Row>
          <Col sm={4}>
            <Image src={userProfile.pictureLargeUrl} className={styles.profilePicture} responsive rounded/>
          </Col>
          <Col sm={8}>
            <Form horizontal>
              {field('Name', userProfile.fullName)}
              {field('Email Address', userProfile.email)}
            </Form>
          </Col>
        </Row>
      </Panel>
    )
  }
}
