import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

export default function Header() {
  return (
    <Navbar>
      <NavbarContent>
        <NavbarItem>
          <Link color="foreground" href="/">Home</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/setup">Setup</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/generate">Generate Schedule</Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">Contact Us</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
