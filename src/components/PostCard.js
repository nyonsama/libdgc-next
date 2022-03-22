import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import NextLink from "next/link";
import Image from "next/image";
import { AiFillTag } from 'react-icons/ai'
import Tag from './Tag.js';


/**
 * 
 * @param {{
 *    title: string,
 *    description: string,
 *    date: string,
 *    tags: Array<string>,
 *    href: string,
 *    image: string
 * }} param0 props
 */
const PostCard = ({ title, description, date, tags, href, image, tagOnClick }) => {
  return (
    <Card className='mb-4'>
      <div style={{ backgroundColor: '#e0e0e0', height: '6rem' }} className='d-flex justify-content-center mt-1 position-relative'>
        {image ? <Image src={image} alt="Post thumbnail" layout='fill' objectFit="cover" /> : null}
      </div>
      <Card.Body> {/* Card.Body自带flex */}
        <div className="d-flex flex-row">
          <span className="h5">{title}</span>
          <span className="text-secondary flex-grow-1 text-end">{date}</span>
        </div>
        <div>{description}</div>
        <div className="mb-2">
          <NextLink href={href} passHref><a>阅读全文</a></NextLink>
        </div>
        <Stack as="ul" className='list-unstyled mb-0' direction='horizontal' gap={2}>
          <AiFillTag size='1.25rem' />
          {
            tags.map((v) => (
              <Tag text={v} key={v} onClick={tagOnClick} href='/test' />
            ))
          }
        </Stack>
      </Card.Body>
    </Card>
  )
};

export default PostCard;