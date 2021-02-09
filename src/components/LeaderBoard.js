import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  Image
} from 'react-bootstrap';

class LeaderBoard extends Component {
  render() {
    const { userPoints, users } = this.props

    return (
      <div className="create-leaderboard-container">
        <div className="leaderboard-container">
          <h3 className="leaderboard-title">
            <i className="fas fa-star"></i>
            Leaderboard
            <i className="fas fa-star"></i>
          </h3>
          <ul className="leaderboard-list">
            {userPoints.map(points => (
              <li className="leaderboard-items" key={points.id}>
                {/* user name */}
                <div className="leaderboard-name-wrapper">
                  <p className="leaderboard-name">

                  {/* user image */}
                  <Image
                    className="user-photo leaderboard-photo"
                    src={users[points.id].avatarURL}
                    alt={users[points.id].name}
                  />
                    {users[points.id].name}
                  </p>
                </div>

                <div className="leaderboard-results">
                  {/* asked question */}
                  <div className="leaderboard-label leaderboard-asked">
                    Asked
                    <div className="leaderboard-container">
                      <p className="leaderboard-results-label">
                        {users[points.id].questions.length}
                      </p>
                    </div>
                  </div>

                  {/* answered question */}
                  <div className="leaderboard-label leaderboard-answer">
                    Answered
                    <div className="leaderboard-container">
                      <p className="leaderboard-results-label">
                        {Object.keys(users[points.id].answers).length}
                      </p>
                    </div>
                  </div>

                  {/* score */}
                  <div className="leaderboard-label leaderboard-score">
                    Score
                  <div className="leaderboard-container">
                    <div className="leaderboard-results-label">
                      {users[points.id].questions.length + Object.keys(users[points.id].answers).length}
                    </div>
                  </div>
                  </div>
                </div>
              </li>
            ))}
           </ul>
       </div>
     </div>
    );
  }
}

LeaderBoard.propTypes = {
  userPoints: PropTypes.array.isRequired,
  users: PropTypes.object.isRequired,
}

const mapStateToProps = ({ users }) => {
  const leaderBoardData = Object.values(users);
  const userPoints = leaderBoardData.map(user => ({
    id: user.id,
    totalPoints: users[user.id].questions.length + Object.keys(users[user.id].answers).length
  })).sort((a,b) => b.totalPoints - a.totalPoints)

  return {
    userPoints,
    users
  }
}

export default connect(mapStateToProps)(LeaderBoard);