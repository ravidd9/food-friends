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
    constructor() {
        super()
        this.state = {
            value: 150
        }
    }

    handleChange = (event, value) => {
        this.setState({ value },function(){
            this.props.generalStore.filterFoodByBudget(this.state.value)
        })
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

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
