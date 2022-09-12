import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfilePictureAction } from '../Redux/action';
import '../css/Header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      hash: '',
      gravatarImg: '',
    };
  }

  componentDidMount() {
    const { email } = this.props;
    const getHash = md5(email).toString();
    this.setState(() => ({
      hash: getHash,
    }), () => this.imgToGlobalState());
  }

  imgToGlobalState = () => {
    const { hash } = this.state;
    const { sendLinkImg } = this.props;
    const gravatarImg = `https://www.gravatar.com/avatar/${hash}`;
    this.setState(() => ({
      gravatarImg,
    }));
    sendLinkImg(gravatarImg);
  };

  render() {
    const { gravatarImg } = this.state;
    const { name, score } = this.props;

    return (
      <header>
        <div className="header-user">
          <img
            className="header-picture"
            src={ gravatarImg }
            alt="gravatar"
            data-testid="header-profile-picture"
          />
          <p
            className="header-name"
            data-testid="header-player-name"
          >
            {name}
          </p>
        </div>
        <p className="header-score-container">
          SCORE:
          <span
            className="header-score"
            data-testid="header-score"
          >
            {score}
          </span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  sendLinkImg: (sendImg) => dispatch(getProfilePictureAction(sendImg)),
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
