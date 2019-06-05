import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import { positions } from '@material-ui/system';

const useStyles = makeStyles(theme => ({
  fab: {
    backgroundColor: '#2ecc71',
    color: '#f5f0f0',
    height: '60px',
    width: '250px',
    fontSize: '20px',
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function FloatingActionButtons() {
  const classes = useStyles();

//   addInterestedFood = () => {
//         let generalStore = this.props.generalStore
//         if(generalStore.filteredFood[0]){
//             generalStore.addInterestedFood()
//             window.location = "http://localhost:3000/food-room" 
//         }
//     }

  return (
    <div>
      <Fab variant="extended" aria-label="Delete" className={classes.fab}>
        Find Food Friends
      </Fab>
    </div>
  );
}