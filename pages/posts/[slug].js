import fs from 'fs';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import Head from 'next/head';
import path from 'path';
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils';
import Navbar from '../../src/components/Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../../src/components/Footer';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { mdxjs } from 'micromark-extension-mdxjs';
import { mdxFromMarkdown } from 'mdast-util-mdx';
import * as MDXComponents from '../../src/components/mdx';
import MDXToc from '../../src/components/Toc';
import rehypeHighlight from 'rehype-highlight';
import NextLink from 'next/link';

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components = {

  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  // h3: dynamic(() => import('../../src/components/mdx').then((mdx) => mdx.H3)),
  h1: MDXComponents.H1,
  h2: MDXComponents.H2,
  h3: MDXComponents.H3,
  h4: MDXComponents.H4,
  h5: MDXComponents.H5,
  h6: MDXComponents.H6,
  pre: MDXComponents.Pre,
  NextLink
};

export default function PostPage({ source, frontMatter, tree }) {
  return (
    <>
      <Head>
        <title>{`${frontMatter.title} - libdgc`}</title>
      </Head>
      <div className='d-flex flex-column h-100'>
        <Navbar />
        <Container className='my-4'>
          <Row>
            <Col md='2'>
              <MDXToc tree={tree} />
            </Col>
            <Col md='10'>
              {/* <div className="post-header mb-4">
              <h1 className='fs-1 mb-2'>{frontMatter.title}</h1>
              {frontMatter.description && (
                <p className="description">{frontMatter.description}</p>
              )}
            </div> */}
              <main>
                <MDXRemote {...source} components={components} />
              </main>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const tree = fromMarkdown(content, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()]
  });

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [rehypeHighlight],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      tree: tree
    },
    revalidate: 10,
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}