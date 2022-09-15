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
      !/^[\w.]+@[\w.]+.[a-z]{2,3}(.[a-z]{2})?$/i.test(email),
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
          <div className="input-container">
            <input
              data-testid="input-player-name"
              id="player-name"
              name="name"
              onChange={ this.handleChange }
              placeholder="Name"
              type="text"
            />
            <input
              data-testid="input-gravatar-email"
              id="gravatar-email"
              name="email"
              onChange={ this.handleChange }
              placeholder="E-mail"
              type="text"
            />
          </div>
          <div className="btn-container">
            <button
              data-testid="btn-play"
              disabled={ isBtnDisabled }
              type="submit"
              value="play"
            >
              Play
            </button>
            <button
              data-testid="btn-settings"
              onClick={ this.handleClickSettings }
              type="button"
              value="settings"
            >
              Settings
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
