import React, { Component } from 'react';
import PropTypes from 'prop-types';
import triviaAPI from '../services/triviaAPI';
import Header from '../components/Header';
import '../css/Game.style.css';

const INITIAL_STATE = {
  questions: {},
  questionIndex: 0,
  loading: true,
  myAnswer: false,
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
    const { questions, questionIndex, myAnswer } = this.state;
    const { incorrect_answers: incorrectAnswers } = questions[questionIndex];

    return incorrectAnswers.map((answer, index) => (
      <button
        key={ index }
        type="button"
        data-testid={ `wrong-answer-${index}` }
        className={ (myAnswer) ? 'wrong__answer' : '' }
        onClick={ this.clickAnswerHandler }
      >
        {answer}
      </button>
    ));
  };

  getCorrectAnswer = () => {
    const { questions, questionIndex, myAnswer } = this.state;
    const { correct_answer: correctAnswer } = questions[questionIndex];
    console.log(questions);
    return (
      <button
        key={ 4 }
        type="button"
        data-testid="correct-answer"
        className={ (myAnswer) ? 'correct__answer' : '' }
        onClick={ this.clickAnswerHandler }
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
      myAnswer: true,
    }));
    // quando mudar de questão precisa resetar o estado
  };

  render() {
    const { loading, questions, questionIndex } = this.state;
    return (
      !loading
      && (
        <div>
          <Header />
          <div>
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
      )
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Game;
