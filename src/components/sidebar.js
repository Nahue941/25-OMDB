import React from 'react';
import { Link } from 'react-router-dom';

import { useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useStyles from '../assets/styles';

export default ({ handleDrawerClose, categories, selectGenre }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </div>
      <Divider />

      <List>
        {categories && categories.map(category => (
          <Link key={category.id} to={`/genre/${category.name.toLowerCase()}`} onClick={() => selectGenre(category.id)}>
            <ListItem button >
              <ListItemText primary={category.name} />
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}

    </>
  );
}
