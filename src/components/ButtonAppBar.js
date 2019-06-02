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
import HowToReg from '@material-ui/icons/HowToReg';
import { Link } from 'react-router-dom';
import "../style/ButtonAppBar.css"


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
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
        <Link to="/profile">
          <ListItem button key={"Profile"}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary={"Profile"} />
          </ListItem>
        </Link>
        <ListItem button key={"Matches"}>
          <ListItemIcon>
            <HowToReg />
          </ListItemIcon>
          <ListItemText primary={"Matches"} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
          {sideList('left')}
        </Drawer>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon onClick={toggleDrawer('left', true)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>

          <Button color="inherit" onClick={login}>{sessionStorage.login ? "LOGOUT" : "LOGIN"}</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default ButtonAppBar;