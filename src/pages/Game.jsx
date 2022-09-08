import React, { Component } from 'react';
import triviaAPI from '../services/triviaAPI';

export default class Game extends Component {
  state = {
    questions: {},
    questionIndex: 0,
    loading: true,
  };

  async componentDidMount() {
    const questions = await triviaAPI();
    this.setState({ questions, loading: false });
  }

  createArrayOfAnswers = () => {
    const { questions, questionIndex } = this.state;
    const {
      incorrect_answers: incorrect,
      correct_answer: correct,
    } = questions[questionIndex];

    const correctAnswer = (
      <button type="button" data-testid={ correct }>{correct}</button>
    );

    const incorrectAnswers = incorrect.map((answer, index) => (
      <button key={ index } type="button" data-testid={ `wrong-answer-${index}` }>
        {answer}
      </button>
    ));

    return [...incorrectAnswers, correctAnswer];
  };

  render() {
    const { loading, questions, questionIndex } = this.state;
    return (
      !loading
      && (
        <div>
          <p data-testid="question-category">
            {questions[questionIndex].category}
          </p>

          <p data-testid="question-text">
            {questions[questionIndex].question}
          </p>

          <div data-testid="answer-options">
            {
              this.createArrayOfAnswers()
            }
          </div>
        </div>
      )
    );
  }
}
