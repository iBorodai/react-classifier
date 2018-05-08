"use strict";

import React from "react";
import Chips from './chips';
import propTypes from '../types/propTypesClassifier';

class Classifier extends React.Component {

    constructor(props) {
        super(props);

        this.removeChip = this.removeChip.bind(this);
    }

    componentWillUnmount() {
        if (!!this.props.onComponentUnmount) this.props.onComponentUnmount.call(this);
    }

    componentDidMount() {
        if (!!this.props.onComponentMount) this.props.onComponentMount.call(this);
    }

    removeChip(code) {
        const newValues = this.props.values.reduce((prev, i) => {
            if (i.id !== code) prev.push(i);
            return prev;
        }, []);
        this.props.changeHandler(newValues, this.props.values);
    }

    render() {

        let chips = (!this.props.values || !this.props.values.length)
            ? null
            : this.props.values.map(i => {
                return <Chips
                    key={i.id}
                    code={i.id}
                    name={(i.name || '')}
                    isLoading={this.props.isLoading}
                    clickHandler={this.removeChip}
                />;
            });

        let classNameComp = 'cct-component cct-classifier-' + this.props.id;
        if (!!this.props.isLoading) classNameComp += ' loading';

        const loading = !!this.props.isLoading
            ? <i className="loading">loading</i>
            : null;

        return (
            <div className={classNameComp}>
                {chips} {loading}
            </div>
        );
    }
}

Classifier.propTypes = propTypes;

export default Classifier;