import {
  default as React,
  Component,
} from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  MenuItem,
} from 'react-bootstrap';

export default class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand className="logo">
            <a href="#">OMM JAPAN 2016</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );
  }
}
