import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ClassifierComponent from '../components/classifier'
import { genActions } from '../reducers/classifier';

export default (params) => {

    const ACTIONS = genActions(params.clientFunctions);

    class ClassifierContainer extends React.Component {
        constructor(props){
            super(props);
            this.reloadItems = this.reloadItems.bind(this);
        }

        componentDidMount() {
            this.props.actExtractItems();
            if( !!params.clientFunctions.onInit )
                params.clientFunctions.onInit(this);
        }

        componentDidUpdate(prevProps, prevState) {
            console.log(this.props);
        }        

        reloadItems(){
            this.props.actExtractItems();
        }

        render() {
            return <ClassifierComponent
                values={this.props.items}
                isLoading={this.props.loading}
                changeHandler={this.props.actSetItems}
            />
        }
    }

    const mapStateToProps = function (state) {
        return {
            items: state.classifier.items,
            loading: state.classifier.loading
        };
    };

    const mapDispatchToProps = dispatch => bindActionCreators({
        actSetItems: ACTIONS.actSetItems,
        actExtractItems: ACTIONS.actExtractItems,
    }, dispatch);

    const resp = connect(
        mapStateToProps,
        mapDispatchToProps
    )(ClassifierContainer);

    return resp;
}