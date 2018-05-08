"use strict";

import React from "react";
import propTypes from '../types/propTypesChips';
// import PropTypes from 'prop-types';

class Chips extends React.Component {
    render() {
        const name = !!this.props.name
            ? <span className="cct-chips-name" title={this.props.name}>{this.props.name}</span>
            : null;

        const loading = !!this.props.isLoading
            ? <i className="loading">loading</i>
            : null;

        return (
            <span onClick={e => this.props.clickHandler(this.props.code)} className="cct-chips-item">
                <span className="cct-chips-code">{this.props.code}</span>
                {name}
                {loading}
            </span>
        );
    }
}

Chips.propTypes = propTypes;

export default Chips;