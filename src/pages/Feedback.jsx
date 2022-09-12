import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { NextQuestionAction, resetScoreAction } from '../Redux/action';

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
      <div>
        <div>
          <Header />
          <h1 data-testid="feedback-text">Feedback</h1>
          { assertions < THREE
            ? <h1 data-testid="feedback-text">Could be better...</h1>
            : <h1 data-testid="feedback-text">Well Done!</h1>}

          <p data-testid="feedback-total-question">{ assertions }</p>
          <p data-testid="feedback-total-score">{ score }</p>
        </div>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.goToLogin }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking
        </button>
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
