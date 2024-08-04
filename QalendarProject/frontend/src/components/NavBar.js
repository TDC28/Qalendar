import React from 'react';
import { Navbar, Link } from '@nextui-org/react';
import { Text } from "@nextui-org/react";


const NavBar = () => {
  return (
    <Navbar isCompact isBordered variant="sticky">
      <Navbar.Brand>
        <img src="/static/images/logo.png" alt="Qalendar Logo" style={{ width: '40px', marginRight: '10px' }} />
        <Text b color="inherit" hideIn="xs">Qalendar</Text>
      </Navbar.Brand>
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/about">About</Navbar.Link>
        <Navbar.Link href="/contacts">Contacts</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
};

export default NavBar;