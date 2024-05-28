import { Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/auth";
import { useReload } from "../../hooks/reload";
import defaultAvatar from "/assets/default-avatar.png";
import "./style.css";

const navItems = [
  { name: "Home", url: "/" },
  { name: "Courses", url: "/courses" },
  // { name: "About Us", url: "/about-us" },
  // { name: "Policy", url: "/policy" },
  { name: "FAQs", url: "/faqs" },
  { name: "Contact Us", url: "/contact" },
];

function NavbarComp() {
  const [user, setUser] = useState(null);
  const { reload } = useReload();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const data = await fetch("http://localhost:8080/api/user/me", {
        method: "GET",
        credentials: "include",
      });
      const response = await data.json();
      const user = response.user;
      setUser(user);
    };
    getUser();
  }, [reload]);

  const handleLogout = async () => {
    await fetch("http://localhost:8080/api/user/logout", {
      method: "GET",
      credentials: "include",
    });
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <>
      <Navbar expand="md" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>LMS</Navbar.Brand>
          </LinkContainer>
          {isAuthenticated ? (
            <div className="ms-auto d-block d-md-none">
              <LinkContainer to="/profile">
                <Image
                  className="me-3 user-avatar"
                  src={user?.avatar?.url || defaultAvatar}
                  roundedCircle
                  width="30px"
                  height="30px"
                />
              </LinkContainer>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <LinkContainer to="/login">
              <Button
                variant="outline-secondary"
                className="ms-auto d-block d-md-none"
              >
                Login
              </Button>
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav className="mx-auto">
                {navItems
                  ? navItems.map((item, index) => (
                      <LinkContainer key={index} to={item.url}>
                        <Nav.Link>{item.name}</Nav.Link>
                      </LinkContainer>
                    ))
                  : null}
              </Nav>
            </Nav>
          </Navbar.Collapse>
          {isAuthenticated ? (
            <div className="ms-auto d-none d-md-block">
              <LinkContainer to="/profile">
                <Image
                  className="me-3 user-avatar"
                  src={user?.avatar?.url || defaultAvatar}
                  roundedCircle
                  width="30px"
                  height="30px"
                />
              </LinkContainer>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="ms-auto d-none d-md-block">
              <LinkContainer to="/login">
                <Button variant="outline-secondary mx-1" size="sm">
                  Login
                </Button>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Button variant="secondary mx-1" size="sm">
                  Signup
                </Button>
              </LinkContainer>
            </div>
          )}
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default NavbarComp;
