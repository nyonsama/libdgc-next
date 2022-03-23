import Card from 'react-bootstrap/Card';

const FriendLinks = (props) => {
  return (
    <Card {...props}>
      <Card.Header>友情链接</Card.Header>
      <Card.Body>
        <Card.Text><del>暂时还没有</del></Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FriendLinks;