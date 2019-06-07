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
         <h3 className="leaderboard-title">Leaderboard</h3>
         <ul className="leaderboard-list">
           {userPoints.map(points => (
             <li className="leaderboard-items" key={points.id}>
                <div className="user-img">
                  <Image
                    className="user-photo leaderboard-photo"
                    src={users[points.id].avatarURL}
                    alt={users[points.id].name}
                  />
                </div>
                <div className="leaderboard-wrapper">
                  <div className="leaderboard-name">{users[points.id].name}</div>
                  <div className="questions-asked">Asked: {users[points.id].questions.length}</div>
                  <div className="questions-answered">Answered: {Object.keys(users[points.id].answers).length}</div>
                </div>
                <div className="leaderboard-total">
                  <div className="leaderboard-score">Score</div>
                  <div className="score-container">
                    <div className="leaderboard-points">
                      {users[points.id].questions.length + Object.keys(users[points.id].answers).length}
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