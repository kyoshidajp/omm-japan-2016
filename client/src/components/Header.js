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
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem eventKey={1} href="http://theomm.jp/?page_id=1063">Official</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
