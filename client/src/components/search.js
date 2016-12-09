import React, { Component, PropTypes } from 'react';
import {
  Button,
  InputGroup,
  FormGroup,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap';

import * as OMM from '../constants/OMM';
import Suggest from './Suggest';

export default class Search extends Component {

  componentDidMount() {
    this.props.actions.loadBibs();
  }

  render() {
    return (
      <FormGroup>
        <InputGroup>
          <DropdownButton bsStyle="primary"
            componentClass={InputGroup.Button}
            title={this.props.search.searchTarget}
            id="input-dropdown-addon">
            {this.props.search.searchTargets.map(target =>
              <MenuItem key={target}
                eventKey="1"
                onClick={() => this.props.ommActions.onChangeSearchTarget(target)}>{target}</MenuItem>
            )}
          </DropdownButton>
          <Suggest
            allResults={this.props.map.allResults}
            search={this.props.search}
            actions={this.props.actions}
          />
        </InputGroup>
      </FormGroup>
    )
  }
}
