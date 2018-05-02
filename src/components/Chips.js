"use strict";

import React from "react";
import PropTypes from 'prop-types';

class Chips extends React.Component {
    render() {
        const name = !!this.props.name 
            ? <span className="cct-chips-name">{this.props.name}</span>
            : ''
            ;

        return (
            <span onClick={e => this.props.clickHandler(this.props.code)} className="cct-chips-item">
                <span className="cct-chips-code">{this.props.code}</span>
                {name}
            </span>
        );
    }
}

Chips.propTypes = {
    code: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    name: PropTypes.string
}

export default Chips;