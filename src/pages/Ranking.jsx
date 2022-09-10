import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const { name, score, picture } = this.props;
    const rankSaved = JSON.parse(localStorage.getItem('ranking'));
    const currentPlayer = { name, score, picture };
    if (!rankSaved) {
      localStorage.setItem('ranking', JSON.stringify([currentPlayer]));
    } else {
      localStorage.setItem('ranking', JSON.stringify([...rankSaved, currentPlayer]));
    }
    const rankFromLocalStorage = JSON.parse(localStorage.getItem('ranking'));

    const sortedRank = rankFromLocalStorage.sort(({ score: a }, { score: b }) => a - b);

    this.setState({ ranking: sortedRank });
  }

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
    return (
      <div>
        <div>
          {
            ranking.map(({ name, score, picture }, index) => (
              <div key={ index }>
                <img src={ picture } alt={ `Foto ${index}` } />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </div>
            ))
          }
        </div>
        <button data-testid="btn-go-home" type="button" onClick={ this.handleClick }>
          Sair
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.player.name,
  score: state.player.score,
  picture: state.player.gravatarImg,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  picture: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Ranking);
