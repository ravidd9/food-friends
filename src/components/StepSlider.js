import React, { Component } from 'react';
import '../style/StepSlider.css';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import { observer, inject } from 'mobx-react';


const styles = {
    root: {
        width: 300,
    },
    slider: {
        padding: '22px 0px',
    },
};

@inject("generalStore")
@observer
class StepSlider extends Component {
    

    handleChange = (event, value) => {
        this.props.generalStore.budget = value
    };

    render() {
        const { classes } = this.props;
        const value  = this.props.generalStore.budget

        return (
            <div className={classes.root}>
                <div>Budget:  {value}₪</div>
                <Slider
                    className={classes.slider}
                    value={value}
                    min={10}
                    max={150}
                    step={10}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}

StepSlider.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(StepSlider)
