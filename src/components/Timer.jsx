import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { didUserAnswerAction } from '../Redux/action';

const ONE_SECOND_COUNTER = 1000;

class Timer extends Component {
  state = {
    timer: 30000,
  };

  timerCountdownHandler = () => {
    const { timer } = this.state;
    const { didAnswer } = this.props;
    const setTimer = setTimeout(() => {
      this.setState({ timer: timer - ONE_SECOND_COUNTER });
    }, ONE_SECOND_COUNTER);
    if (!timer) {
      didAnswer();
      clearTimeout(setTimer);
    }
  };

  render() {
    const { timer } = this.state;
    this.timerCountdownHandler();
    return <h3 id="timer">{ timer / ONE_SECOND_COUNTER }</h3>;
  }
}

Timer.propTypes = {
  didAnswer: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  didAnswer: () => dispatch(didUserAnswerAction()),
});

export default connect(null, mapDispatchToProps)(Timer);
