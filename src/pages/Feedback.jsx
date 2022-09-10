import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { NextQuestionAction } from '../Redux/action';

class Feedback extends React.Component {
  // TODO - necessário resetar o score a 0 quando inicia novo jogo
  goToLogin = () => {
    const { history, nextQuestion } = this.props;
    nextQuestion();
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const THREE = 3;
    console.log('renderizando feedback');
    return (
      <div>
        <div>
          <Header />
          <h1 data-testid="feedback-text">Feedback</h1>
          { assertions < THREE
            ? <p data-testid="feedback-text">Could be better...</p>
            : <p data-testid="feedback-text">Well Done!</p>}

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
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
