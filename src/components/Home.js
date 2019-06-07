import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PollQuestion from './PollQuestion';

import {
  Tab,
  Tabs
} from 'react-bootstrap';

//home component that contains the unanswered and answered tabs
class Home extends Component {
  render() {
    const { unanswered, answered } = this.props;

    return (
      <div className="poll-list">
        <Tabs className="poll-tabs">
          <Tab
            eventKey="home"
            title="Unanswered Questions">
              <ul className="poll-list-questions">
                {unanswered.map(question => (
                  <li key={question.id}>
                    <PollQuestion id={question.id} />
                  </li>
                ))}
              </ul>
          </Tab>
          <Tab
            eventKey="profile"
            title="Answered Questions">
              <ul className="poll-list-questions">
                {answered.map(question => (
                  <li key={question.id}>
                    <PollQuestion id={question.id} />
                  </li>
                ))}
              </ul>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

Home.propTypes = {
  unanswered: PropTypes.array.isRequired,
  answered: PropTypes.array.isRequired,
}

const mapStateToProps = ({ users, authedUser, questions }) => {
  const userAnswerIds = Object.keys(users[authedUser].answers);
  const questionsData = Object.values(questions);

  return {
    unanswered: questionsData.filter(ua => !userAnswerIds.includes(ua.id))
      .sort((a,b) => b.timestamp - a.timestamp),
    answered: questionsData.filter(a => userAnswerIds.includes(a.id))
      .sort((a,b) => b.timestamp - a.timestamp)
  }
}

export default connect(mapStateToProps)(Home);