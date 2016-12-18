import React, { Component, PropTypes } from 'react';
import {
  Button,
  InputGroup,
  FormGroup,
  DropdownButton,
  ButtonGroup,
  MenuItem,
  Input,
  Checkbox,
  Radio,
  RadioGroup,
  Row,
  Col,
  Form,
} from 'react-bootstrap';

import * as OMM from '../constants/OMM';
import Suggest from './Suggest';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.changeDay = this.changeDay.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadBibs();
    window.suggestInput.focus();
  }

  changeTarget(target) {
    this.props.actions.onChangeSearchTarget(target);
    window.suggestInput.focus();
  }

  changeDay(event) {
    this.props.actions.changeDay(event);
    window.suggestInput.focus();
  }

  render() {
    return (
      <Form inline>
        <FormGroup>
          <InputGroup>
            <DropdownButton bsStyle="primary"
              componentClass={InputGroup.Button}
              title={this.props.search.searchTarget}
              id="input-dropdown-addon">
              {this.props.search.searchTargets.map(target =>
                <MenuItem key={target}
                  eventKey="1"
                  onClick={() => this.changeTarget(target)}>{target}</MenuItem>
              )}
            </DropdownButton>
            <Suggest
              ref="suggest"
              allResults={this.props.map.allResults}
              search={this.props.search}
              actions={this.props.actions}
            />
          </InputGroup>
        </FormGroup>
        <FormGroup className="day">
          <InputGroup>
          {[OMM.DAYS.DAY1, OMM.DAYS.DAY2].map(day =>
            <Radio inline
              key={day.code}
              onChange={this.changeDay}
              value={day.code}
              checked={this.props.search.selectedDay === day.code}>{day.value}</Radio>
          )}
          </InputGroup>
        </FormGroup>
      </Form>
    );
  }
}
