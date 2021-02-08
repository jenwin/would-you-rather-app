import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { _getDate } from '../utils/_DATA';
import PropTypes from 'prop-types';

import {
  Button,
  Image
} from 'react-bootstrap';

class PollQuestion extends Component {

  render() {
    const { userId, question, question_id } = this.props;

    return (
      <div className="unanswered-container">
        <div className="date">{_getDate(question.timestamp)}</div>
        <div className="content-wrapper">

          {/* user name, image */}
          <div className="poll-questions-title-one">
            <p>
              <Image
                className="user-photo"
                src={userId.avatarURL}
                alt={userId.name}
              />
              {userId.name} asks...
            </p>
          </div>

          {/* content section */}
          <div className="poll-questions-title-two">
            <p>Would you rather?</p>
          </div>
          <div className="unanswered-options">
            <div className="unanswered-options-text">
              {question.optionOne.text}
            </div>
            <div className="or">
              or
            </div>
            <div className="unanswered-options-text">
              {question.optionTwo.text}
            </div>
          </div>
        </div>
        <div className="view-poll">
          <Link to={`/questions/${question_id}`}>
            <Button variant="secondary">View Poll</Button>
          </Link>
        </div>
      </div>
    );
  }
}

PollQuestion.propTypes = {
  userId: PropTypes.object.isRequired,
  question: PropTypes.object.isRequired,
  question_id: PropTypes.string.isRequired
}

const mapStateToProps = ({ users, questions }, { id }) => {
  const question = questions[id]
  const question_id = question.id
  const userId = users[question.author]

  return {
    question,
    question_id,
    userId
  }
}

export default connect(mapStateToProps)(PollQuestion);