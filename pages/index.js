import Head from 'next/head';
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import PostCard from '../src/components/PostCard';
import Pagination from 'react-bootstrap/Pagination';
import Tag from '../src/components/Tag';
import Navbar from '../src/components/Navbar'
import AboutMe from '../src/components/AboutMe';
import FriendLinks from '../src/components/FriendLinks';

import { postFilePaths, POSTS_PATH, POSTS_PATH_REALTIVE } from '../utils/mdxUtils';
import Footer from '../src/components/Footer';
import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';


export const getStaticProps = async () => {
  const posts = await Promise.all(
    postFilePaths.map(async (filename) => {
      const filePath = path.join(POSTS_PATH, filename);
      const source = await fs.readFile(filePath);
      const data = matter(source).data

      data.location = `/${POSTS_PATH_REALTIVE}/${filename.replace(/\.mdx?$/, '')}`;
      if (!data.tags) data.tags = [];

      const stat = await fs.stat(filePath);
      data.mtimeMs = stat.mtimeMs;
      if (!data.date) data.date = '0000-1-1';

      return data;
    }));

  posts.sort((a, b) => b.mtimeMs - a.mtimeMs);
  return {
    props: {
      posts,
    }
  };
};

const AllTags = ({ posts, tagOnClick, ...props }) => {
  /** @type {Map<string, number>} */
  const tagMap = new Map();
  posts.map((post) => post.tags).flat().forEach((tag) => {
    if (!tagMap.has(tag)) {
      tagMap.set(tag, 1);
    } else {
      tagMap.set(tag, tagMap.get(tag) + 1);
    }
  });
  const sortedTags = [...tagMap.entries()].sort((a, b) => b[1] - a[1]).map((pair) => pair[0]);
  return (
    <Card {...props}>
      <Card.Header>全部tag</Card.Header>
      <Card.Body className='d-flex flex-wrap'>
        {
          sortedTags.map((v) => <Tag className='me-2 mb-2' text={v} key={v} onClick={tagOnClick} />)
        }
      </Card.Body>
    </Card>
  )
}

/**
 * 解析搜索框里的字符串
 * @param {string} query query
 * @return {{tags: Array<string>, text: Array<string>}}
 */
const parseSearchQuery = (query) => {
  const tokenTypes = {
    whitespace: 'whitespace',
    tags: 'tags',
    quoted: 'quoted',
    text: 'text',
  }

  const patterns = new Map([
    [tokenTypes.whitespace, /\s+/],
    [tokenTypes.tags, /tag:/],
    [tokenTypes.quoted, /(['"]).*?(\1|$)/],
    [tokenTypes.text, /\S+?((?= )|$)/],
  ]);

  const tokens = [];
  let i = 0;
  while (i < query.length) {
    for (const [tokenType, regexp] of patterns) {
      const match = query.slice(i).match(regexp);
      if (match && match.index === 0) {
        tokens.push({
          type: tokenType,
          value: tokenType === tokenTypes.quoted ? match[0].slice(1, -1) : match[0]
        });
        i += match[0].length;
        break;
      }
    }
  }

  const states = {
    start: 'start',
    tag: 'tag'
  }

  const tags = [];
  const text = [];
  let state = states.start;
  for (const token of tokens) {
    switch (state) {
      case states.start:
        switch (token.type) {
          case tokenTypes.tags:
            state = states.tag;
            break;
          case tokenTypes.text:
          case tokenTypes.quoted:
            text.push(token.value);
            break;
          default:
            break;
        }
        break;

      case states.tag:
        switch (token.type) {
          case tokenTypes.text:
          case tokenTypes.quoted:
            tags.push(token.value);
            state = states.start;
            break;
          default:
            state = states.start;
            break;
        }

      default:
        break;
    }
  }
  return {
    tags,
    texts: text
  };
}

const Home = ({ posts, ...props }) => {
  const [searchText, setSearchText] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const [currentPage, setCurrentPage] = useState(1);
  const appendTagToSearchText = (text) => {
    const newText = `${searchText} tag:${text}`.trimStart();
    setSearchText(newText);
    return newText;
  };

  const filterPosts = (queryText) => {
    const { tags, texts } = parseSearchQuery(queryText || searchText);
    const filtered = posts.filter((post) => {
      return tags.every((tag) => post.tags.includes(tag));
    }).filter((post) => {
      return texts.every((text) => `${post.title} ${post.description}`.search(text) !== -1);
    });
    setFilteredPosts(filtered);
  };

  const tagOnClick = (text) => {
    filterPosts(appendTagToSearchText(text));
  };

  const cardsPerPage = 10;
  const maxPage = Math.ceil(filteredPosts.length / cardsPerPage);

  return (
    <>
      <Head>
        <title>libdgc-next</title>
      </Head>

      <Navbar />

      <Container className='mb-3'>
        <Row className='justify-content-center'>
          <Col >
            <h1 className='display-1 my-4 text-center'>Yet Another Useless Blog</h1>
            <p className='display-6 text-center'>会写一些乱七八糟东西的无用博客</p>
            <hr />
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col md='8'>
            <InputGroup className='mb-3'>
              <Form.Control
                placeholder="从标题和简介中搜索 点击tag可以筛选tag"
                aria-label="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') filterPosts();
                }}
              />
              <Button onClick={() => filterPosts()}>搜索</Button>
            </InputGroup>
            {
              filteredPosts.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage).map((post) => (
                <PostCard
                  key={post.title}
                  title={post.title}
                  description={post.description}
                  tags={post.tags}
                  href={post.location}
                  image={post.image}
                  date={post.date}
                  tagOnClick={tagOnClick}
                />
              ))
            }
            <div className='d-flex justify-content-center'>
              <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage === 1 ? 1 : currentPage - 1)} />
                {
                  [...Array(maxPage).keys()]
                    .map(i => i + 1)
                    .map((i) => (
                      <Pagination.Item key={i} active={i === currentPage} onClick={() => setCurrentPage(i)}>
                        {i}
                      </Pagination.Item>
                    ))
                }
                <Pagination.Next onClick={() => setCurrentPage(currentPage === maxPage ? maxPage : currentPage + 1)} />
                <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
              </Pagination>
            </div>
          </Col>
          <Col md='4'>
            <AboutMe className='mb-4' />
            <AllTags posts={posts} tagOnClick={tagOnClick} className='mb-4' />
            <FriendLinks />
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Home;