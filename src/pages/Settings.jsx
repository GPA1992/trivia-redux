import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '../css/Settings.css';

class Settings extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <main className="Settings">
        <div className="settings-header">
          <button
            className="back-button"
            type="button"
            onClick={ () => history.push('/') }
            data-testid="btn-go-home2"
          >
            <FontAwesomeIcon icon={ faArrowLeft } />
          </button>
          <h1 data-testid="settings-title">Settings</h1>
        </div>
        <section>
          <button
            className="clear-ranking-button"
            type="button"
            onClick={ () => localStorage.clear() }
            data-testid="clear-Ranking"
          >
            <FontAwesomeIcon icon={ faTrashCan } />
            Clear Ranking
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
