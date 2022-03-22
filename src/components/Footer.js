import Container from "react-bootstrap/Container";
const Footer = () => {
  return (
    <footer className='bg-light py-4 mt-auto'>
      <Container>
        <div className='d-flex justify-content-between'>
          <span className=''>libdgc.club</span>
          <span className=''>Made with Next.js, Bootstrap and ✋</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;