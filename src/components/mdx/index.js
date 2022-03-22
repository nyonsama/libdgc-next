export const generateId = (text) => {
  return text
    .toLowerCase()
    .replace(/[  +]/g, '-');
};

export const H1 = ({ children }) => {
  const anchor = generateId(children);
  const link = `#${anchor}`;
  return (
    <h1 id={anchor} className='fs-1'>
      {children}
    </h1>
  );
};

export const H2 = ({ children }) => {
  const anchor = generateId(children);
  const link = `#${anchor}`;
  return (
    <h2 id={anchor} className='fs-2'>
      {children}
    </h2>
  );
};

export const H3 = ({ children }) => {
  const anchor = generateId(children);
  const link = `#${anchor}`;
  return (
    <h3 id={anchor} className='fs-3'>
      {children}
    </h3>
  );
};

export const H4 = ({ children }) => {
  const anchor = generateId(children);
  const link = `#${anchor}`;
  return (
    <h4 id={anchor}>
      {children}
    </h4>
  );
};

export const H5 = ({ children }) => {
  const anchor = generateId(children);
  const link = `#${anchor}`;
  return (
    <h5 id={anchor}>
      {children}
    </h5>
  );
};

export const H6 = ({ children }) => {
  const anchor = generateId(children);
  const link = `#${anchor}`;
  return (
    <h6 id={anchor}>
      {children}
    </h6>
  );
};

export const Pre = ({ children }) => {
  return (
    <pre className="border rounded">
      {children}
    </pre>
  );
};