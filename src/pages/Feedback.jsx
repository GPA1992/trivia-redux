import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faRotateRight,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header';
import { NextQuestionAction, resetScoreAction } from '../Redux/action';
import '../css/Feedback.css';
import Logo from '../components/Logo';

class Feedback extends React.Component {
  goToLogin = () => {
    const { history, nextQuestion, resetScore } = this.props;
    nextQuestion();
    resetScore();
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    return (
      <div className="Feedback">
        <Header />
        <Logo />
        <div className="feedback-card">
          {assertions < THREE ? (
            <h1 className="bad-feedback" data-testid="feedback-text">
              Could be better...
            </h1>
          ) : (
            <h1 className="good-feedback" data-testid="feedback-text">
              Well Done!
            </h1>
          )}
          <p className="feedback-assertions-container">
            You got
            <span
              data-testid="feedback-total-question"
              className="feedback-assertions"
            >
              {assertions}
            </span>
            questions right.
          </p>
          <p className="feedback-score-container">
            Your Score:
            <span
              className="feedback-score"
              data-testid="feedback-total-score"
            >
              {score}
            </span>
          </p>
        </div>
        <div className="feedback-button-container">
          <div className="button-container">
            <button type="button" data-testid="btn-play-again" onClick={ this.goToLogin }>
              <FontAwesomeIcon icon={ faRotateRight } />
            </button>
            <p>Play Again</p>
          </div>
          <div className="button-container">
            <button type="button" data-testid="btn-ranking" onClick={ this.goToRanking }>
              <FontAwesomeIcon icon={ faTrophy } />
            </button>
            <p>Ranking</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  assertions: store.player.assertions,
  score: store.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  nextQuestion: () => dispatch(NextQuestionAction()),
  resetScore: () => dispatch(resetScoreAction()),
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  resetScore: PropTypes.func.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
