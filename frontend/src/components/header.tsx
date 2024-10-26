import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { useLocation } from "react-router-dom";
import { QalendarLogo } from "./logo";

export default function Header() {
  const location = useLocation();
  const isActive = (path: string): boolean => location.pathname === path;

  return (
    <Navbar>
      <NavbarBrand className="w-auto">
        <QalendarLogo />
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4">
        <NavbarItem isActive={isActive("/")}>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/event-manager")}>
          <Link color="foreground" href="/event-manager">
            Event Manager
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/generate")}>
          <Link color="foreground" href="/generate">
            Generate Calendar
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive("/contact")}>
          <Link color="foreground" href="/contact">
            Contact Us
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
