import {
  default as React,
  Component
} from 'react';
import {
  Navbar,
  Nav,
  NavItem,
  MenuItem
} from 'react-bootstrap';

export default class OMMNavbar extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">OMM Japan 2016</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">Compare</NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="http://theomm.jp/?page_id=1063">OMM Japan Official</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
