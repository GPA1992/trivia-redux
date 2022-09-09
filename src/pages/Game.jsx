import React, { Component } from 'react';
import PropTypes from 'prop-types';
import triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';
import '../css/Game.style.css';

const INITIAL_STATE = {
  questions: {},
  questionIndex: 0,
  loading: true,
  answerBtns: {
    myAnswer: false,
    isDisabled: false,
  },
  timer: 30000,
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
      questionIndex, answerBtns: { myAnswer, isDisabled }, timer } = this.state;
    const { incorrect_answers: incorrectAnswers } = questions[questionIndex];

    return incorrectAnswers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        className={ (myAnswer) ? 'wrong__answer' : '' }
        onClick={ this.clickAnswerHandler }
        disabled={ isDisabled || !timer }
      >
        {answer}
      </button>
    ));
  };

  getCorrectAnswer = () => {
    const {
      questions,
      questionIndex, answerBtns: { myAnswer, isDisabled }, timer } = this.state;
    const { correct_answer: correctAnswer } = questions[questionIndex];
    return (
      <button
        key={ 4 }
        type="button"
        data-testid="correct-answer"
        className={ (myAnswer) ? 'correct__answer' : '' }
        onClick={ this.clickAnswerHandler }
        disabled={ isDisabled || !timer }
        // id="correct"
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

  timerCountdownHandler = () => {
    const ONE_SECOND_COUNTER = 1000;
    const { timer } = this.state;
    const setTimer = setTimeout(() => {
      this.setState({ timer: timer - ONE_SECOND_COUNTER });
    }, ONE_SECOND_COUNTER);
    if (!timer) {
      clearTimeout(setTimer);
    }
  };

  handleClickTest = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { loading, questions, questionIndex, timer } = this.state;
    this.timerCountdownHandler();
    return (
      <div>
        { loading && <p> Loading... </p> }
        {!loading
        && (
          <div>
            <Header />
            <div>
              <h3>{ timer }</h3>
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

            <button data-testid="btn-go-home" type="button" onClick={ this.handleClickTest }>
              rank
            </button>
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
};

export default Game;
