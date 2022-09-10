import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Countdown from 'react-countdown';
import triviaAPI from '../services/triviaAPI';
import { userPerformance, didUserAnswerAction } from '../Redux/action';
import Loading from './Loading';
import Header from '../components/Header';
import '../css/Game.style.css';

const INITIAL_STATE = {
  timer: 30000,
  questions: {},
  questionIndex: 0,
  loading: true,
  answerBtns: {
    myAnswer: false,
    isDisabled: false,
  },
};

const ONE_SECOND_COUNTER = 1000;

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

  setDifficulty = () => {
    const { questions, questionIndex } = this.state;
    const difficultyList = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return difficultyList[questions[questionIndex].difficulty];
  };

  clickAnswerHandler = ({ target }) => {
    const { setUserPerformance } = this.props;
    const base = 10;

    if (target.name === 'correctAnswer') {
      const timer = document.getElementById('timer').innerHTML;
      const upScore = base + (Number(timer) * this.setDifficulty());
      setUserPerformance(upScore);
    }
    this.setState(() => ({
      timer: 0,
      answerBtns: {
        myAnswer: true,
        isDisabled: true,
      },
    }));
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
        name="correctAnswer"
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

  onTimerFinished = () => {
    this.setState({
      timer: 0,
      answerBtns: {
        myAnswer: true,
        isDisabled: true,
      },
    }, () => this.updateGlobalAnswer());
  };

  updateGlobalAnswer = () => {
    const { didAnswer } = this.props;
    const { answerBtns: { myAnswer } } = this.state;
    didAnswer(myAnswer);
  };

  changeQuestion = () => {
    console.log('eu vou para próxima pergunta');
  };

  render() {
    const { loading, questions, questionIndex, timer, answerBtns } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        {!loading
        && (
          <div>
            <Header />
            <div>
              <h3>
                <Countdown
                  onComplete={ this.onTimerFinished }
                  name="timer"
                  date={ Date.now() + timer }
                  renderer={ ({ total }) => (
                    <p id="timer">{ total / ONE_SECOND_COUNTER}</p>) }
                />
              </h3>
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
            {answerBtns.isDisabled && (
              <button
                type="button"
                data-testid="btn-next"
                onClick={ this.changeQuestion }
              >
                Next
              </button>)}
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
  setUserPerformance: PropTypes.func.isRequired,
  didAnswer: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  responseFromGlobalState: state.player.didAnswer,
});

const mapDispatchToProps = (dispatch) => ({
  setUserPerformance: (performanceData) => dispatch(userPerformance(performanceData)),
  didAnswer: (val) => dispatch(didUserAnswerAction(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
