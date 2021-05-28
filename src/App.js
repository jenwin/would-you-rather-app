import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import LoadingBar from 'react-redux-loading';
import PropTypes from 'prop-types';
import Login from './components/Login';
import Nav from './components/Nav';
import Home from './components/Home';
import PollQuestion from './components/PollQuestion';
import AddQuestion from './components/AddQuestion';
import LeaderBoard from './components/LeaderBoard';
import PollDetails from './components/PollDetails';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

class App extends Component {
  componentDidMount() {
    const { handleInitialData } = this.props;
    handleInitialData();
  }

  render() {
    const { loading } = this.props

    return (
      <div className="app">
        <div className="routes-container">
          <Router>
            <LoadingBar />
              {(loading === true) ? (
              <div className="login-route">
                <Route path="/" component={Login} />
              </div>
              ) : (
              <Fragment>
                <Nav />
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/pollquestion" component={PollQuestion} />
                    <Route exact path="/add" component={AddQuestion} />
                    <Route exact path="/leaderboard" component={LeaderBoard} />
                    <Route exact path="/questions/:question_id" component={PollDetails} />
                    <Route component={Home} />
                  </Switch>
              </Fragment>
              )}
            <Footer />
          </Router>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleInitialData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
}

const mapStateToProps = ({ authedUser, questions }) => {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps, { handleInitialData })(App);