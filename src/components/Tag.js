import styled from "styled-components";

const RoundedPill = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const Tag = ({ text, onClick, ...prop }) => {
  if (!prop.className) prop.className = '';
  prop.className += " text-decoration-none border rounded-pill px-3 pb-1 text-secondary";
  return (
    <RoundedPill
      onClick={() => onClick(text)}
      className={prop.className}
    >
      {text}
    </RoundedPill>
  )
}
export default Tag;