import React from 'react';
import Header from './Header';

class Settings extends React.Component {
  render() {
    return (
      <main>
        <Header />
        <h2 data-testid="settings-title">Settings</h2>
      </main>
    );
  }
}

export default Settings;
