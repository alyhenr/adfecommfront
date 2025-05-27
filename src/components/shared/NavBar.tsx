import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { FaCheck, FaShoppingCart, FaSignInAlt, FaXbox, FaXingSquare } from "react-icons/fa";
import Logo from "../../assets/YOUDE.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/reducers/store";
import { IoCloseCircle } from "react-icons/io5";
import { logoutUser } from "../../store/actions";

const pages = [{ title: "Produtos", to: "/products" }, 
               { title: "Sobre", to: "/about" },
               { title: "Contato", to: "/contact" }];
const settings = [{ title: "Perfil", to: "/profile" },
                  { title: "Minha conta", to: "/account" }, 
                  { title: "Minhas compras", to: "orders" }, 
                  { title: "Logout", to: "/logout" }];

const NavBar = () => {

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const [logoutClicked, setLogoutClicked] = React.useState<boolean>(false)

  const navigate = useNavigate()

  const dispatch = useDispatch<AppDispatch>()

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
    setLogoutClicked(false)
  };

  const pathName = useLocation().pathname

  const cartCount = useSelector(
    (state: RootState) => state.cartState.products.length
  );

  const user = useSelector(
    (state: RootState) => state.authState.user
  );

  const handleLogout = () => {
    dispatch(logoutUser())
    setAnchorElUser(null)
    navigate("/")
  } 

  return (
    <AppBar position="sticky" color={"primary"} sx={{ bgcolor: "#E4E4DE" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" width={250} />
          </Typography>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={Logo} alt="Logo" width={250} />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.title} to={page.to} className={`${pathName == page.to ? "opacity-60" : ""}`}>
                <Button
                  sx={{ my: 2, color: "black", display: "block" }}
                >
                  {page.title}
                </Button>
              </Link>
            ))}
          </Box>
          <div className="flex items-center gap-5">
            <Link to="cart">
              <Badge 
                showZero
                badgeContent={cartCount}
                color="primary"
                overlap="circular"
                anchorOrigin={{
                  vertical: 'top', horizontal: 'right'
                }}
              >
                <FaShoppingCart
                  size={28}
                  className="hover:cursor-pointer shadow-2xl text-[#1B1B1B]"
                />
              </Badge>
            </Link>
            <Box sx={{ flexGrow: 0, display: `${user?.userId > 0 ? "flex" : "none"}` }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={user.username} src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.title} onClick={() => setting.to != "/logout" ? navigate(setting.to) : setLogoutClicked(true)}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.title}
                    </Typography>
                  </MenuItem>
                ))}
                <div className={`${logoutClicked ? "block" : "hidden"}`}>
                  <Typography sx={{ textAlign: "center", mt: 2, borderTop: 1, pt: 1, mb: 1}}>
                    Confirmar logout
                  </Typography>
                  <div className="flex w-full justify-between px-7">
                    <FaCheck color="green" className="hover:cursor-pointer hover:scale-105" size={20} onClick={handleLogout}/>
                    <IoCloseCircle color="red" className="hover:cursor-pointer hover:scale-105" size={20} onClick={() => setLogoutClicked(false)}/>
                  </div>
                </div>
              </Menu>
            </Box>
                <Box sx={{ flexGrow: 0, display: `${user?.userId <= 0 ? "flex" : "none"}` }}>
                  <Link 
                    to="login"
                    className="hidden md:flex items-center space-x-2 px-4 py-[6px] bg-gradient-to-r from-purple-600 to-red-500 text-white font-semibold rounded-md shadow-lg hover:from-purple-500 hover:to-red-400 transition duration-300 ease-in-out transform bg-pink-900}"
                  >
                    <FaSignInAlt />
                    <span>Login</span>
                  </Link>
                </Box>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
