import React, { Component } from 'react';
import { CircularProgress } from '@material-ui/core';

class ColoredLinearProgress extends Component {
  render() {
    return (
      <CircularProgress
        {...this.props}
        style={{marginLeft: '50%', marginTop: '10%'}}
      />
    );
  }
}

export default ColoredLinearProgress;
