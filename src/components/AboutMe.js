import Card from "react-bootstrap/Card";
import NextImage from "next/image";
import { AiFillGithub } from "react-icons/ai";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiBilibiliFill } from "react-icons/ri";
import Avatar from '../../public/images/avatar.png';

const IconLink = ({ children, ...props }) => {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const AboutMe = (props) => {
  return (
    <Card {...props}>
      <Card.Header>关于我</Card.Header>
      <Card.Body className='d-flex flex-column align-items-center'>
        <div className='position-relative mb-2' style={{ height: '5rem', width: '5rem' }}>
          <NextImage
            className='rounded-circle'
            src={Avatar}
            layout='fill'
            objectFit='contain'
            title="Puchiko(Di Gi Charat)"
          />
        </div>
        <p className='mb-2'>ivnm</p>
        <p className='mb-2'>人类</p>
        <div className='d-flex flex-row'>
          <IconLink href='https://twitter.com/ivnm1020619738' className='text-dark me-2'>
            <AiFillTwitterCircle size='2rem' />
          </IconLink>
          <IconLink href='https://github.com/nyonsama' className='text-dark me-2'>
            <AiFillGithub size='2rem' />
          </IconLink>
          <IconLink href='https://space.bilibili.com/35402406' className='text-dark'>
            <RiBilibiliFill size='2rem' />
          </IconLink>
        </div>
      </Card.Body>
    </Card>
  );
};

export default AboutMe;