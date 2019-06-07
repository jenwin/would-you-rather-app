import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import PropTypes from 'prop-types';

import {
  Button,
  Form
} from 'react-bootstrap';

class Login extends Component {
  state = {
    value: null
  }

  handleForm = e => {
    e.preventDefault();
    this.setState({
      value: e.target.value
    });
  }

  handleLogin = () => {
    const { setAuthedUser } = this.props;
    const { value } = this.state;
    setAuthedUser(value);
  }

  render() {
    const { users } = this.props;
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    return (
      <div className="login-page">
        <h1 className="login-title">Would You Rather?</h1>
          <Form.Group onChange={this.handleForm}>
            <Form.Label>Sign In</Form.Label>
              <Form.Control className="login-input" as="select">
                <option value="">Select A Friend</option>
                {users.map(user => {
                  return (
                    <option
                      key={user.id}
                      value={user.id}>{user.name}
                    </option>
                  );
                })}
              </Form.Control>
          </Form.Group>
          <Button
            className="login-btn"
            variant="light"
            onClick={this.handleLogin}
            disabled={disabled}>
            LOGIN
          </Button>
      </div>
    );
  }
}

Login.propTypes = {
  setAuthedUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
}

const mapStateToProps = ({ users }) => {
  return {
    users: Object.values(users)
  }
}

export default connect(mapStateToProps, { setAuthedUser })(Login);