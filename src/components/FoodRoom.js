import React, { Component } from 'react';
import '../style/FoodRoom.css';
import ChosenFood from './ChosenFood';
import { inject, observer } from 'mobx-react';
import InterestedUsers from './InterestedUsers';
import { Redirect } from 'react-router-dom'

@inject("generalStore")
@observer

class FoodRoom extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedFood: props.generalStore.filteredFood[0].name
        }
    }

    changeSelectedFood = foodName => this.setState({selectedFood: foodName})

    render() {

        console.log(this.props.generalStore.currentUser)

        let selectedFoods = this.props.generalStore.filteredFood
        let interestedUsers = this.props.generalStore.interestedUsers

        
        
        return (



            <div>

                {selectedFoods[0] ?

                    <div className="foodRoom">

                        {selectedFoods.map((s, i) => <ChosenFood key={i} selectedFood={s} />)}

                        <div className="whosInterested">
                            <InterestedUsers />
                        </div>
                    </div> :
                    <Redirect to="/home" />

                }

            </div>

        );
    }
}

export default FoodRoom;