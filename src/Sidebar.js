import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 200,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: 200,
  },
}));

export default function CustomSidebar (props) {
  const classes = useStyles();
  const theme = useTheme();
//Drawer provide access to destinations in your app. Side sheets are surfaces containing supplementary 
//content that are anchored to the left or right edge of the screen.
const drawer = (
  <div>
    <div className={classes.toolbar} />
    <Divider />
    <List>
      {/* {['Home', 'About'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <InfoIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))} */}
      <ListItem button key={'home'} component={Link} to={'/'}>
        <ListItemIcon>{<HomeIcon />}</ListItemIcon>
        <ListItemText primary={'Home'} />
      </ListItem>
      <ListItem button key={'about'} component={Link} to={'/about'}>
        <ListItemIcon>{<InfoIcon />}</ListItemIcon>
        <ListItemText primary={'About'} />
      </ListItem>
    </List>
    <Divider />
    <List>
      {/*{['Tasks'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{<ListAltIcon />}</ListItemIcon>
          <ListItemText primary={'Tasks'} />
        </ListItem>
      ))}*/}
      <ListItem button key={'tasks'} component={Link} to={'/tasks'}>
        <ListItemIcon>{<ListAltIcon />}</ListItemIcon>
        <ListItemText primary={'Tasks'} />
      </ListItem>
    </List>
  </div>
);

return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Drawer
        classes={{
          paper: classes.drawerPaper,
        }}
        variant="permanent"
        open
      >
        {drawer}
      </Drawer>
  </nav>
  )
}