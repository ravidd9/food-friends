import React, { Component } from 'react';
import Particles from 'react-particles-js';
import data from '../particlesjs-config.json'


const particleOpt = {
    data
}

class D3 extends Component {
    render() {
        return (
            <div>

                <Particles
                    params={data} 
                    height={600}
                    />
            </div>
        );
    }
}

export default D3;