import React from 'react';

import LeaderBoard from 'components/leader-board';
import APIService from 'services/api';

export default class App extends React.Component {

  constructor (props) {
    super(props);
    this.API = new APIService(); // no backend to config
  }

  render () {
    return <LeaderBoard API={this.API} />;
  }
}