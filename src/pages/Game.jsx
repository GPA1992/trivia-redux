import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';
import Loading from './Loading';
import Timer from '../components/Timer';
import '../css/Game.style.css';

const INITIAL_STATE = {
  questions: {},
  questionIndex: 0,
  loading: true,
  answerBtns: {
    myAnswer: false,
    isDisabled: false,
  },
};

class Game extends Component {
  state = INITIAL_STATE;

  async componentDidMount() {
    const { history } = this.props;
    const token = localStorage.getItem('token');
    const questions = await triviaAPI(token);

    if (!questions.length) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({ questions, loading: false });
  }

  shuffleArray = (array) => {
    const SHUFFLE_NUMBER = 0.5;
    return array.sort(() => Math.random() - SHUFFLE_NUMBER);
  };

  getIncorrectAnswers = () => {
    const {
      questions,
      questionIndex, answerBtns: { myAnswer, isDisabled } } = this.state;
    const { responseFromGlobalState } = this.props;
    const { incorrect_answers: incorrectAnswers } = questions[questionIndex];

    return incorrectAnswers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        className={ (myAnswer || responseFromGlobalState) ? 'wrong__answer' : '' }
        onClick={ this.clickAnswerHandler }
        disabled={ isDisabled || responseFromGlobalState }

      >
        {answer}
      </button>
    ));
  };

  getCorrectAnswer = () => {
    const {
      questions,
      questionIndex, answerBtns: { myAnswer, isDisabled } } = this.state;
    const { responseFromGlobalState } = this.props;
    const { correct_answer: correctAnswer } = questions[questionIndex];
    return (
      <button
        key={ 4 }
        type="button"
        data-testid="correct-answer"
        className={ (myAnswer || responseFromGlobalState) ? 'correct__answer' : '' }
        onClick={ this.clickAnswerHandler }
        disabled={ isDisabled || responseFromGlobalState }
      >
        {correctAnswer}
      </button>
    );
  };

  createArrayOfAnswers = () => {
    const arrayOfAnswers = [...this.getIncorrectAnswers(), this.getCorrectAnswer()];
    return this.shuffleArray(arrayOfAnswers);
  };

  clickAnswerHandler = () => {
    this.setState(() => ({
      answerBtns: {
        myAnswer: true,
        isDisabled: true,
      },
    }));
  };

  render() {
    const { loading, questions, questionIndex } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        {!loading
        && (
          <div>
            <Header />
            <div>
              <Timer />
              <p data-testid="question-category">
                {questions[questionIndex].category}
              </p>
            </div>
            <p data-testid="question-text">
              {questions[questionIndex].question}
            </p>
            <div data-testid="answer-options">
              {this.createArrayOfAnswers()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  responseFromGlobalState: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  responseFromGlobalState: state.player.didAnswer,
});

export default connect(mapStateToProps)(Game);
