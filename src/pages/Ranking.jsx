import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';
import { resetScoreAction } from '../Redux/action';
import '../css/Ranking.css';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const { name, score, picture } = this.props;
    const rankSaved = JSON.parse(localStorage.getItem('ranking'));
    const currentPlayer = { name, score, picture };
    if (!rankSaved) {
      localStorage.setItem('ranking', JSON.stringify([]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...rankSaved, currentPlayer]));
    }
    const rankFromLocalStorage = JSON.parse(localStorage.getItem('ranking'));

    const sortedRank = rankFromLocalStorage.sort(({ score: a }, { score: b }) => b - a);

    this.setState({ ranking: sortedRank });
  }

  handleClick = () => {
    const { history, resetScore } = this.props;
    resetScore();
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div className="Ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="button-container">
          <button data-testid="btn-go-home" type="button" onClick={ this.handleClick }>
            <FontAwesomeIcon icon={ faRotateRight } />
            Play Again
          </button>
        </div>
        <table>
          <tbody>
            {
              ranking.map(({ name, score, picture }, index) => (
                <tr key={ index }>
                  <td className="position">{ index + 1}</td>
                  <td className="avatar">
                    <img src={ picture } alt={ `Foto ${index}` } />
                  </td>
                  <td className="name" data-testid={ `player-name-${index}` }>{name}</td>
                  <td
                    className="score"
                    data-testid={ `player-score-${index}` }
                  >
                    {score}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.gravatarImg,
});

const mapDispatchToProps = (dispatch) => ({
  resetScore: () => dispatch(resetScoreAction()),
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
  resetScore: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
