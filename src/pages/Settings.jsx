import React from 'react';
import Logo from '../components/Logo';
import '../css/Settings.css';

class Settings extends React.Component {
  render() {
    return (
      <main className="settings">
        <h2 data-testid="settings-title">Settings</h2>
        <Logo />
      </main>
    );
  }
}

export default Settings;
