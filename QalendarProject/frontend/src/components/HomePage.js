import React from 'react';
import { Container, Card } from '@nextui-org/react';

const HomePage = () => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Text h1>Welcome to Qalendar</Text>
          <Text p>This is the home page.</Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default HomePage;