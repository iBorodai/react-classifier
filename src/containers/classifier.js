import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import  ClassifierComponent from '../components/classifier'
import {
    actSetItems,
    actExtractItems
} from '../reducers/classifier'


class Classifier extends React.Component {

    componentDidMount(){
        this.props.actExtractItems( this.props.extractItems );
    }
    componentDidUpdate(prevProps, prevState) {
        // console.log(this.props);
    }

    render(){
        return <ClassifierComponent 
            changeHandler = {this._changeHandler.bind(this)}
            // changeHandler = {this.this.props.actSetItems}
            values={this.props.items}
            isLoading={this.props.loading}
        />
    }

    _changeHandler(data){
        this.props.changeHandler(data);
        this.props.actSetItems(data);
    }
}

const mapStateToProps = function (state) {
    return {
        items: state.classifier.items,
        loading: state.classifier.loading
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    actSetItems,
    actExtractItems,
    // actLoadNames,
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Classifier)
