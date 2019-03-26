import React from 'react';

// custom components
import { ListPlayer, EditPlayer } from 'components/player';

// mui
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Clear';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default class LeaderBoard extends React.Component {

  static defaultPlayers = [
    { profilePic: "001-boy-13", name: "Jim Schmid", winnings: 10000, country: "United States of America" },
    { profilePic: "001-boy-13", name: "Jim Schmid", winnings: 153220, country: "United States of America" },
    { profilePic: "001-boy-13", name: "Jim Schmid", winnings: 1000000, country: "United States of America" },
    { profilePic: "001-boy-13", name: "Jim Schmid", winnings: 11200, country: "United States of America" }
  ];

  state = {
    newPlayer: false,
    players: []
  };

  constructor (props) {
    super(props);
  }

  componentDidMount () {
    // get players
    this.commit(n=>n);
  }

  async commit (update) {
    update();
    let players = LeaderBoard.defaultPlayers;
    try {
      players = await this.props.API.Player.get();
    } catch (e) {
      console.error(e);
    }
    if (players) this.setState({ players });
  }

  async addPlayer (player) {
    const newPlayer = await this.props.API.Player.add(player);
    return newPlayer;
  }
  async updatePlayer (player) {
    const updatedPlayer = await this.props.API.Player.update(player);
    return updatedPlayer;
  }

  render () {
    return [
      <Paper>
        <List dense>
          <ListItem style={{backgroundColor: "#717171"}}>
            <Fab onClick={ev => this.setState({ newPlayer: !this.state.newPlayer })} size="small" color={this.state.newPlayer ? 'primary': 'secondary'} aria-label="Add">
              { this.state.newPlayer ? <CancelIcon /> : <AddIcon /> }
            </Fab>
            <ListItemText primary={<span style={{color: "white"}}>Player</span>} />
            <ListItemText primary={''} />
            <ListItemText primary={<span style={{color: "white"}}>Winnings</span>} />
            <ListItemText primary={''} />
            <ListItemText primary={<span style={{color: "white"}}>Native Of</span>} />
          </ListItem>
          {
            this.state.newPlayer ? (
              <EditPlayer commit={player => this.commit(this.addPlayer.bind(this, player)) } />
            ) : null
          }
          {
            this.state.players.map((player, rank) => (
              <ListPlayer key={rank} rank={rank} player={player}
                commit={player => this.commit(this.updatePlayer.bind(this, player))}
              />
            ))
          }
        </List>
      </Paper>,
      <div style={{fontSize: '8px', paddingTop: '1rem'}}>Flag icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>,
      <div style={{fontSize: '8px'}}>Avatar icons made by <a href="https://smashicons.com/" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
    ];
  }
}