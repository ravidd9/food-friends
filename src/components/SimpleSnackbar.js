import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';


const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },

})

@inject("generalStore")
@observer
class SimpleSnackbar extends Component {

  // handleClick = () => this.props.generalStore.handleMatchNotification(true)

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    this.props.generalStore.handleMatchNotification(false)
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        {/* <Button onClick={this.handleClick}>Open simple snackbar</Button> */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.props.generalStore.matchNotification.open}
          autoHideDuration={20000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{`You matched with ${this.props.generalStore.matchNotification.name}`}</span>}
          action={[
            <Link to="/show-match"> <Button key="undo" size="small" onClick={this.handleClose}>
            CHAT
          </Button></Link>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleSnackbar)