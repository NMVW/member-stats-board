import React from 'react';

// assets
import avatars from 'assets/avatars';
import countries from 'assets/countries';

// mui
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CommitIcon from '@material-ui/icons/Check';
import MenuItem from '@material-ui/core/MenuItem';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';

import Utils from 'services/utils';
import MenuForm from 'components/menu';

export class ListPlayer extends React.Component {

  static Utils = Utils;

  state = {
    editMode: false
  };

  constructor (props) {
    super(props);
  }

  render () {
    const { player } = this.props;
    const list = (
      <ListItem key={this.props.rank} button>
        { this.props.rank + 1 }. 
        <ListItemAvatar>
          <Avatar
            alt={`Avatar ${player.name}`}
            src={require(`assets/avatars/${player.profilePic}.png`)}
          />
        </ListItemAvatar>
        <ListItemText secondary={player.name} />
        <ListItemText secondary={ListPlayer.Utils.formatCurrency(player.winnings)} />
        <ListItemAvatar>
          <Avatar
            alt={`Avatar ${player.name}`}
            src={require(`assets/countries/${ListPlayer.Utils.kebabify(player.country)}.png`)}
          />
        </ListItemAvatar>
        <IconButton onClick={ev => this.setState({ editMode: !this.state.editMode })} aria-label="Edit">
          <EditIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
    const edit = (
      <EditPlayer
        player={player}
        commit={updatedPlayer => {
          if (updatedPlayer) this.props.commit(updatedPlayer);
          this.setState({ editMode: false });
        }}
      />
    );
    if (this.state.editMode) {
      return edit;
    } else {
      return list;
    }
  }
}

export class EditPlayer extends React.Component {

  state = {
    name: '',
    winnings: 0,
    country: '',
    profilePic: ''      
  };

  constructor (props) {
    super(props);
    if (props.player) this.state = props.player;
  }

  render () {
    return (
      <ListItem>
        <MenuForm
          label={"Profile Pic"}
          value={this.state.profilePic}
          select={profilePic => this.setState({ profilePic })}
        >
          {
            avatars.map((avatar, i) => (
              <MenuItem key={i} value={avatar.name}>
                <ListItemAvatar key={i}>
                  <Avatar
                    alt={avatar.name}
                    src={avatar.value}
                  />
                </ListItemAvatar>
              </MenuItem>
            ))
          }
        </MenuForm>
        <TextField
          label="Name"
          value={this.state.name}
          onChange={({ target }) => this.setState({ name: target.value })}
          margin="normal"
        />
        <TextField
          label="Winnings"
          value={this.state.winnings}
          onChange={({ target }) => this.setState({ winnings: +target.value })}
          margin="normal"
        />
        <MenuForm
          label={"Country"}
          value={this.state.country}
          select={country => this.setState({ country })}
        >
          {
            countries.map((country, i) => (
              <MenuItem key={i} value={country.name}>
                <ListItemText key={i} secondary={country.name} />
              </MenuItem>
            ))
          }
        </MenuForm>
        <IconButton onClick={ev => this.props.commit(this.state)} aria-label="Edit">
          <CommitIcon fontSize="small" />
        </IconButton>
      </ListItem>
    );
  }
}