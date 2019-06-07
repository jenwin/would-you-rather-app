import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { handleSaveQuestionAnswers } from '../actions/shared';
import PropTypes from 'prop-types';

import NotFound from './NotFound';

import {
  Button,
  Image,
  ProgressBar,
  Badge
} from 'react-bootstrap';

class PollDetails extends Component {
  state = {
    value: ''
  }

  handleRadio = e => {
    this.setState({
      value: e.target.value
    });
  }

  handleResults = () => {
    const { handleSaveQuestionAnswers, authedUser, question } = this.props;
    const { value } = this.state;
    handleSaveQuestionAnswers(authedUser, question.id, value);
  }

  handleSubmit = e => {
    e.preventDefault();
  }

  handleBackBtn = () => {
    this.props.history.push('/');
  }

  render() {
    const { users, question, userVote, optOne, optTwo } = this.props;
    const { value } = this.state;
    const disabled = value === '' ? true : false;

    if (!question) {
      return (
        <div>
          <NotFound />
        </div>
      );
    }

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const optionsTotal = (optionOneVotes + optionTwoVotes);
    const optionOnePercent = (((optionOneVotes / optionsTotal) * 100).toFixed(1));
    const optionTwoPercent = (((optionTwoVotes / optionsTotal) * 100).toFixed(1));
    const optionOneText = question.optionOne.text;
    const optionTwoText = question.optionTwo.text;

    return (
      <div className="poll-list">
        <div className="back-btn">
          <Button
            variant="secondary"
            onClick={this.handleBackBtn}>Back
          </Button>
        </div>
        <div className="unanswered-container results-container">
          {(userVote === undefined) ? (
            <Fragment>
              <div className="info-section">
                <h3 className="info-user">{users[question.author].name} asks:</h3>
                <Image
                  className="user-photo"
                  src={users[question.author].avatarURL}
                  alt={users[question.author].name}
                />
                <div className="info-wrapper">
                  <div>
                    <p className="info-title">Would you rather...</p>
                  </div>
                  <form className="unanswered-form" onSubmit={this.handleSubmit}>
                    <label>
                      <input
                        type="radio"
                        className="option-radio"
                        name="options"
                        value="optionOne"
                        onChange={this.handleRadio}
                        checked={value === 'optionOne'}
                      />{question.optionOne.text}
                    </label>
                    <label>
                      <input
                        type="radio"
                        className="option-radio"
                        name="options"
                        value="optionTwo"
                        onChange={this.handleRadio}
                        checked={value === 'optionTwo'}
                      />{question.optionTwo.text}
                    </label>
                  </form>
                  <div className="unanswered-results-link">
                    <Button
                      className="results-btn"
                      variant="secondary"
                      disabled={disabled}
                      onClick={this.handleResults}>Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Fragment> )
            : ( <Fragment>
                <h2 className="vote-results-title">Results</h2>
                <h3 className="info-user">{users[question.author].name} asked:</h3>
                <div className="info-results">
                  <Image
                    className="user-photo"
                    src={users[question.author].avatarURL}
                    alt={users[question.author].name}
                  />
                  <div className="info-results-wrapper">
                    <div className="info-inner-wrapper">
                      <div className="info-title info-title-space">Would you rather {optionOneText}?</div>
                        {userVote === optOne
                          ? <Badge
                              variant="warning"
                              className="badge-design">Your <br /> Vote
                            </Badge> : null
                         }
                        <ProgressBar
                          className="progress"
                          style={{ height: 30, fontSize: 18 }}
                          now={optionOnePercent}
                          label={`${optionOnePercent}%`}
                        />
                        {optionOneVotes} out of {optionsTotal} votes
                      </div>
                      <div className="info-inner-wrapper">
                       <div className="info-title info-title-space">Would you rather {optionTwoText}?</div>
                         {userVote === optTwo
                           ? <Badge
                              variant="warning"
                              className="badge-design">Your <br /> Vote
                            </Badge> : null
                         }
                         <ProgressBar
                           className="progress"
                           style={{ height: 30, fontSize: 18 }}
                           now={optionTwoPercent}
                           label={`${optionTwoPercent}%`}
                         />
                         {optionTwoVotes} out of {optionsTotal} votes
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        );
      }
  }

PollDetails.propTypes = {
  handleSaveQuestionAnswers: PropTypes.func.isRequired,
  authedUser: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
  userVote: PropTypes.string,
  question: PropTypes.object.isRequired,
  optOne: PropTypes.string.isRequired,
  optTwo: PropTypes.string.isRequired
}

const mapStateToProps = ({ users, authedUser, questions }, { match }) => {
  const question_id = match.params.question_id
  const question = questions[question_id]
  const userId = users[authedUser]
  const userVote = userId.answers[question_id]
  const optValues = Object.values(userId.answers)
  const optOne = optValues[0]
  const optTwo = optValues[1]

  return {
    users,
    userId,
    authedUser,
    question,
    userVote,
    optOne,
    optTwo
  }
}

export default withRouter(connect(mapStateToProps, { handleSaveQuestionAnswers })(PollDetails));