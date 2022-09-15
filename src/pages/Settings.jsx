import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
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

        <section className="developers">
          <h2>Developers:</h2>
          <div className="developers-name">
            <a href="https://www.linkedin.com/in/daniel-outeiro/">
              <FontAwesomeIcon className="icon" icon={ faLinkedin } />
              Daniel Outeiro
            </a>
            <a href="https://www.linkedin.com/in/gabrielproencaaraujo/">
              <FontAwesomeIcon className="icon" icon={ faLinkedin } />
              Gabriel Proença
            </a>
            <a href="https://www.linkedin.com/in/megumiyoriyasu/">
              <FontAwesomeIcon className="icon" icon={ faLinkedin } />
              Megumi Yoriyasu
            </a>
            <a href="https://www.linkedin.com/in/ravan-bezerra/">
              <FontAwesomeIcon className="icon" icon={ faLinkedin } />
              Ravan Bezerra
            </a>
            <a href="https://www.linkedin.com/in/udisonabreu/">
              <FontAwesomeIcon className="icon" icon={ faLinkedin } />
              Udison Abreu
            </a>
          </div>
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
