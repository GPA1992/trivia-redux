import React from 'react';
import './Login.css';

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

  handleClick = () => {
    /* this.setState({ loggedind: true }); */
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
              type="button"
            >
              Play

            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
