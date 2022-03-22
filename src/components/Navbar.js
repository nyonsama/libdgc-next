import BsNavbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import Container from "react-bootstrap/Container"
import NextLink from "next/link"
import { AiFillGithub } from 'react-icons/ai'

const Navbar = () => {
  return (
    <BsNavbar bg="light" expand="md">
      <Container>
        <NextLink href="/" passHref>
          <BsNavbar.Brand>libdgc</BsNavbar.Brand>
        </NextLink>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NextLink href="/" passHref>
              <Nav.Link>主页</Nav.Link>
            </NextLink>
            <NextLink href="/nsfw" passHref>
              <Nav.Link>NSFW</Nav.Link>
            </NextLink>
            <NextLink href="/playground" passHref>
              <Nav.Link>杂七杂八</Nav.Link>
            </NextLink>
          </Nav>
          <a href="https://github.com/nyonsama/libdgc-next" className="text-dark" target="_blank" rel="noopener noreferrer">
            <AiFillGithub size='2rem' />
          </a>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;