import React, { Component } from 'react';
import { ClipLoader } from 'react-spinners';
import '../css/Loading.css';

export default class Loading extends Component {
  render() {
    const color = '#f2f2f2';
    return (
      <div className="Loading">
        <ClipLoader color={ color } loading size={ 35 } />
      </div>
    );
  }
}
