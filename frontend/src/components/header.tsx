import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { useLocation } from "react-router-dom"

export default function Header() {
   const location = useLocation()
   const isActive = (path: string): boolean => location.pathname === path;

  return (
    <Navbar>
      <NavbarContent>
        <NavbarItem isActive={isActive("/")}>
          <Link color="foreground" href="/">Home</Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/setup")}>
          <Link color="foreground" href="/setup">Setup</Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/generate")}>
          <Link color="foreground" href="/generate">Generate Schedule</Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/contact")}>
          <Link color="foreground" href="/contact">Contact Us</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
