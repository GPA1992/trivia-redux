import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../components/Logo';
import '../css/Settings.css';

class Settings extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main className="settings">
        <h2 data-testid="settings-title">Settings</h2>
        <Logo />
        <section>
          <button
            type="button"
            onClick={ () => localStorage.clear() }
            data-testid="clear-Ranking"

          >
            Clear Ranking
          </button>
          <button
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-go-home2"
          >
            Back
          </button>
        </section>
      </main>
    );
  }
}

Settings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Settings;
