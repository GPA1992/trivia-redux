import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import '../css/Login.css';
import tokenAPI from '../services/tokenAPI';
import { loginAction, getEmail } from '../Redux/action';

class Login extends React.Component {
  state = {
    name: '',
    email: '',
    disableEnter: true,
  };

  checkAllForm = () => {
    const { email, name } = this.state;
    const errors = [
      !email.length,
      !name.length,
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email),
    ];
    const checkErrors = errors.every((error) => error === false);
    this.setState({ disableEnter: !checkErrors });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.checkAllForm);
  };

  saveLocalStorageHandler = (infoToSave, keyName) => localStorage
    .setItem(infoToSave, keyName);

  handleClick = async ({ target }) => {
    const { value } = target;
    if (value === 'settings') {
      const { history } = this.props;
      history.push('/settings');
    } else {
      const { name, email } = this.state;
      const { setUser, setEmail, history } = this.props;
      const response = await tokenAPI();
      const { token } = response;
      this.saveLocalStorageHandler('token', token);
      setUser(name);
      setEmail(email);
      console.log('toke:', token);
      history.push('/game');
    }
  };

  render() {
    const { disableEnter } = this.state;
    return (
      <div className="login">
        <div className="form">
          <form action="">
            <label htmlFor="player-name">
              Nome
              <br />
              <input
                onChange={ this.handleChange }
                name="name"
                id="player-name"
                data-testid="input-player-name"
                type="text"
              />
            </label>
            <br />
            <label htmlFor="gravatar-email">
              Email
              <br />
              <input
                onChange={ this.handleChange }
                name="email"
                id="gravatar-email"
                data-testid="input-gravatar-email"
                type="text"
              />
            </label>
            <br />
            <br />
            <button
              disabled={ disableEnter }
              onClick={ this.handleClick }
              data-testid="btn-play"
              value="play"
              type="button"
            >
              Play
            </button>
            <button
              type="button"
              data-testid="btn-settings"
              value="settings"
              onClick={ this.handleClick }
            >
              Configurações
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  setUser: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setUser: (state) => dispatch(loginAction(state)),
  setEmail: (state) => dispatch(getEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
