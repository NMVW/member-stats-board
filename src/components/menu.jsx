import React from 'react';

// mui
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

export default class MenuForm extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    // props: { label: '' , children: [{name, value},]
    return (
      <FormControl>
        <InputLabel>{ this.props.label }</InputLabel>
        <Select
          value={this.props.value}
          onChange={ev => this.props.select(ev.target.value)}
        >
          { this.props.children }
        </Select>
      </FormControl>
    );
  }
}