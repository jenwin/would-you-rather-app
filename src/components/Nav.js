import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';

import {
  Button,
  Image
} from 'react-bootstrap';

class Nav extends Component {
  handleLogout = () => {
    const { setAuthedUser } = this.props;
    setAuthedUser(null);
    this.props.history.push('/');
  }

  render() {
    const { userId } = this.props;

    return (
      <Fragment>
        <div className="nav-container">
          <div className="list-links">
            <div className="nav-list nav-home">
              <i className="fas fa-home"></i>
              <Link className="nav-links home" to="/">Home</Link>
            </div>
            <div className="nav-list nav-question">
              <i className="fas fa-plus"></i>
              <Link className="nav-links new-question" to="/add">Add Question</Link>
            </div>
            <div className="nav-list nav-leaderboard">
              <i className="fas fa-trophy"></i>
              <Link className="nav-links leaderboard" to="/leaderboard">Leadership Board</Link>
            </div>
          </div>
          <div className="nav-username">
            <Image
              src={userId.avatarURL}
              className="nav-user-img"
              width="35"
              height="35"
              rounded
            />
            <span className="nav-name">{userId.name}</span>
            <Button
              className="logout-btn"
              variant="secondary"
              onClick={this.handleLogout}>LOGOUT
            </Button>
          </div>
        </div>
      </Fragment>
    );
  }
}

Nav.propTypes = {
  setAuthedUser: PropTypes.func.isRequired,
  userId: PropTypes.object.isRequired,
}

const mapStateToProps = ({ users, authedUser }) => {
  const userId = users[authedUser]

  return {
    userId
  }
}

export default withRouter(connect(mapStateToProps, { setAuthedUser })(Nav));