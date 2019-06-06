import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Home from '@material-ui/icons/Home';
import HowToReg from '@material-ui/icons/HowToReg';
import Chat from '@material-ui/icons/Chat';
import { Link } from 'react-router-dom';
import "../style/ButtonAppBar.css"


const useStyles = makeStyles(theme => ({
  list: {
    width: 200,
  },
  root: {
    flexGrow: 1,
    background: '#2ecc71',
    color: '#f5f0f0',
    boxShadow: "none"
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  }
}));

function ButtonAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });


  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  }

  const login = () => {
    if (sessionStorage.getItem('login')) {
      sessionStorage.removeItem('login')
      window.location = "http://localhost:3000/home"
    }
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        <ListItem button key={"Navigation"}>
          <ListItemText primary={"Navigation"} />
        </ListItem>
        <Divider />
        <Link to="/home">
          <ListItem button key={"Home"}>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
        </Link>
        <Link to="/profile">
          <ListItem button key={"Profile"}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </Link>
        {/* <Link to="/show-match">
          <ListItem button key={"Matches"}>
            <ListItemIcon>
              <HowToReg />
            </ListItemIcon>
            <ListItemText primary={"Matches"} />
          </ListItem>
        </Link> */}
        <Link to="/chat">
          <ListItem button key={"Chats"}>
            <ListItemIcon>
              <Chat />
            </ListItemIcon>
            <ListItemText primary={"Chats"} />
          </ListItem>
        </Link>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon onClick={toggleDrawer('left', true)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Food-Friends
          </Typography>

          <Button color="inherit" onClick={login}>{sessionStorage.login ? "LOGOUT" : "LOGIN"}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;