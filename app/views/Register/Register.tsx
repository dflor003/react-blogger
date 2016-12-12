import * as React from 'react';
import * as styles from './Register.scss';
import {Component, PropTypes} from 'react';
import {Form, Col, Row, Alert, FormControl, FormGroup, ControlLabel, Image, Button} from 'react-bootstrap';

import AuthService from '../../services/AuthService';
import logger from '../../../server/utils/logger/logger';
import graphql from '../../services/GraphQLService';

const lblSize = 3;
const textSize = 12 - lblSize;
const field = (id: string, label: string, value: any, onChange: any) => (
  <FormGroup>
    <Col sm={lblSize}>
      <ControlLabel htmlFor={id}>{label}</ControlLabel>
    </Col>
    <Col sm={textSize}>
      <FormControl id={id} type="text" placeholder={`Enter ${label}`} value={value} onChange={onChange}/>
    </Col>
  </FormGroup>
);

const log = logger('REGISTER');

export default class Register extends Component<any, any> {
  constructor() {
    super();
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
    };
  }

  static contextTypes = {
    auth: PropTypes.instanceOf(AuthService).isRequired
  };

  componentDidMount() {
    const auth: AuthService = this.context.auth;
    const userProfile = auth.getProfile();
    this.setState({
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      pictureLargeUrl: userProfile.pictureLargeUrl
    });

    log.info(`User hit registration with data`, this.state);
  }

  async registerUser(userData: any) {
    log.info(`User registering with data`, userData);
    try {
      const result = await graphql(`
        mutation addUser(
          $id: String!
          $firstName: String!
          $lastName: String!
          $email: String!
          ) {
          addUser(
            externalId: $id
            firstName: $firstName
            lastName: $lastName
            email: $email
          ) {
            id
          }
        }
      `, userData);
      log.info(`Created user successfully`);
      this.props.router.replace('/home');
    } catch (err) {
      log.error(`Failed to create user`, err);
    }
  }

  render() {
    const onValueChanged = (field: string) =>
      (evt: any) =>
        this.setState({ ...this.state, [field]: evt.target.value });

    return (
      <div className={styles.root}>
        <h1 className="page-header">Register</h1>

        <p className={styles.instructions}>
          Please take the time to fill in a little bit of information
          about yourself.
        </p>

        <Form horizontal onSubmit={() => this.registerUser(this.state)}>
          <Row>
            <Col sm={3}>
              <Image src={this.state.pictureLargeUrl} responsive rounded/>
            </Col>
            <Col sm={9}>
              {field('firstName', 'First Name', this.state.firstName, onValueChanged('firstName'))}
              {field('lastName', 'Last Name', this.state.lastName, onValueChanged('lastName'))}
              {field('emailAddress', 'Email Address', this.state.email, onValueChanged('emailAddress'))}
              <Button type="submit" bsStyle="primary" block={true}>Confirm</Button>
            </Col>
          </Row>
        </Form>
      </div>
    )
  }
}
