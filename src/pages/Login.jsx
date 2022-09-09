import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../css/Login.css';
import tokenAPI from '../services/tokenAPI';
import { loginAction } from '../Redux/action';

class Login extends Component {
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

  saveLocalStorageHandler = (keyName, value) => localStorage
    .setItem(keyName, value);

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClickGame = async () => {
    const { name, email } = this.state;
    const { setUser, history } = this.props;
    const response = await tokenAPI();
    const { token } = response;
    this.saveLocalStorageHandler('token', token);
    setUser({ name, email });
    history.push('/game');
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
              onClick={ this.handleClickGame }
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
              onClick={ this.handleClickSettings }
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

};

const mapDispatchToProps = (dispatch) => ({
  setUser: (state) => dispatch(loginAction(state)),

});

export default connect(null, mapDispatchToProps)(Login);
