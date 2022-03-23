import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const Footer = () => {
  return (
    <footer className='bg-light py-4 mt-auto'>
      <Container>
        <Row>
          <Col md='6' className="mb-2 mb-md-0">
            <span>libdgc.club</span>
          </Col>
          <Col md='6' className="text-md-end" >
            <span>Made with Next.js, Bootstrap and ✋</span>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;