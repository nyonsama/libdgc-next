import { generateId } from "./mdx";

const MDXToc = ({ tree }) => {
  const headings = tree.children
    .filter((v) => v.type === 'heading' && v.depth !== 1)
    .map((v) => ({
      depth: v.depth,
      value: v.children[0].value
    }))
    .reverse();

  const genToc = (headings, depth) => {
    if (headings.length === 0) return (<></>);
    const current = headings[headings.length - 1];
    if (depth < current.depth) {
      return (
        <>
          <ul className="ps-3 list-unstyled">
            {genToc(headings, depth + 1)}
          </ul>
          {genToc(headings, depth)}
        </>
      );
    } else if (depth === current.depth) {
      return (
        <>
          <a href={`#${generateId(current.value)}`} className="text-secondary">
            <li>
              {headings.pop().value}
            </li>
          </a>
          {genToc(headings, depth)}
        </>
      );
    } else {
      return (<></>);
    }
  };

  return (
    <div style={{ position: 'sticky', top: '5rem' }}>
      <p>目录</p>
      <hr/>
      <ul className="list-unstyled">
        {genToc(headings, 2)}
      </ul>
    </div>
  );
};

export default MDXToc;