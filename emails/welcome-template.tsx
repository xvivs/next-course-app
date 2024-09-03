import React, { CSSProperties } from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Tailwind,
  Link,
  Preview
} from '@react-email/components';

const body: CSSProperties = {
  background: '#fff'
}

const heading: CSSProperties = {
  fontSize: '32px'
};

const WelcomeTemplate = ({ name }: { name: string }) => {
  return (
    <Html>
      <Preview>Welcome aboard!</Preview>
      <Tailwind>
        <Body className='bg-white'>
          <Container>
            <Text className='font-bold text-3xl'>Hello {name || 'World'}!</Text>
            <Link href='https://codewithmosh.com'>www.codewithmosh.com</Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
};

export default WelcomeTemplate;