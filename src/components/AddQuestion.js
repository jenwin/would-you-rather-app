import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleSaveQuestions } from '../actions/shared';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  InputGroup,
  FormControl
} from 'react-bootstrap';

class Add extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    submitInput: false
  }

  handleInput = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value
    });
  }

  handleNewQuestion = () => {
    const { optionOneText, optionTwoText } = this.state
    const { handleSaveQuestions, authedUser } = this.props
    handleSaveQuestions(optionOneText, optionTwoText, authedUser);
    this.setState({
      submitInput: true
    });
  }

    handleSubmitForm = e => {
      e.preventDefault();
  }

  render() {
    const { optionOneText, optionTwoText, submitInput } = this.state;
    const disabled = (optionOneText === '' || optionTwoText === '' ? true : false);

    if (submitInput === true) {
      return <Redirect to="/" />
    }

  return (
    <div className="create-leaderboard-container">
      <h3 className="add-question">ask a question</h3>
      <h4 className="add-question-title">Would you rather...</h4>
        <Form onSubmit={this.handleSubmitForm}>
          <InputGroup className="add-input">
            <FormControl
              name="optionOneText"
              onChange={this.handleInput}
              value={optionOneText}
              type="text"
              placeholder="Enter Option One Here"
              required>
            </FormControl>
          </InputGroup>
          <p className="or">OR</p>
          <InputGroup>
            <FormControl
              name="optionTwoText"
              onChange={this.handleInput}
              value={optionTwoText}
              type="text"
              placeholder="Enter Option Two Here"
              required>
            </FormControl>
          </InputGroup>
        </Form>
        <div className="center">
          <Button
            type="submit"
            variant="secondary"
            className="add-question-btn"
            onClick={this.handleNewQuestion}
            disabled={disabled}>Submit
          </Button>
        </div>
     </div>
  );
}}


Add.propTypes = {
  handleSaveQuestions: PropTypes.func.isRequired,
  authedUser: PropTypes.string.isRequired,
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser
  }
}

export default connect(mapStateToProps, { handleSaveQuestions })(Add);