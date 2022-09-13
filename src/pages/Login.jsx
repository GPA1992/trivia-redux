import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tokenAPI from '../services/tokenAPI';
import { loginAction } from '../Redux/action';
import Logo from '../components/Logo';
import '../css/Login.css';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isBtnDisabled: true,
  };

  checkAllForm = () => {
    const { email, name } = this.state;
    const errors = [
      !email.length,
      !name.length,
      !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email),
    ];
    const checkErrors = errors.every((error) => error === false);
    this.setState({ isBtnDisabled: !checkErrors });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, this.checkAllForm);
  };

  saveLocalStorageHandler = (keyName, value) => localStorage
    .setItem(keyName, value);

  handleClickSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const { setUser, history } = this.props;
    const response = await tokenAPI();
    const { token } = response;
    this.saveLocalStorageHandler('token', token);
    setUser({ name, email });
    history.push('/game');
  };

  render() {
    const { isBtnDisabled } = this.state;
    return (
      <div className="Login">
        <form onSubmit={ (e) => this.handleSubmit(e) }>
          <Logo />
          <input
            onChange={ this.handleChange }
            name="name"
            id="player-name"
            data-testid="input-player-name"
            type="text"
            placeholder="Name"
          />
          <input
            onChange={ this.handleChange }
            name="email"
            id="gravatar-email"
            data-testid="input-gravatar-email"
            type="text"
            placeholder="E-mail"
          />
          <div>
            <button
              data-testid="btn-play"
              value="play"
              type="submit"
              disabled={ isBtnDisabled }
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              value="settings"
              type="button"
              onClick={ this.handleClickSettings }
            >
              Configurações
            </button>
          </div>
        </form>
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
