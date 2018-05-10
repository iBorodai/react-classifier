import React from "react";
import PropTypes from 'prop-types';
import SearchInput, { createFilter } from 'react-search-input'

class TreeNode extends React.Component {

    constructor(props) {
        super(props);
        this.triggerOpen = this.triggerOpen.bind(this);
        this.triggerSelected = this.triggerSelected.bind(this);
    }

    triggerOpen(event) {
        this.props.onTriggerOpen(this.props.pathStr, this.props.item.id);
    }
    triggerSelected(event) {
        this.props.onTriggerSelected(this.props.pathStr, this.props.item.id);
    }

    render() {
        const iswithChilds = this.props.item.children && parseInt(this.props.item.children) > 0;

        const classAdd = 'cct-tree-node-item' +
            (!!iswithChilds ? ' cct-item-folder' : '') +
            (!!this.props.item.isOpen ? ' cct-item-open' : '') +
            (!!this.props.item.isSelected ? ' cct-item-selected' : '') +
            (!!this.props.item.isLoading ? ' cct-item-loading' : '')
            ;

        const arrButton = iswithChilds
            ? <span className="cct-item-arr" onClick={this.triggerOpen}> {(!!this.props.item.isOpen || this.props.item.isLoading) ? 'v' : '>'} </span>
            : <span className="cct-item-space"> </span>
            ;

        const nameBlock = !!iswithChilds
            ? <span className="cct-item-name" onClick={this.triggerOpen}> {this.props.item.name} </span>
            : <span className="cct-item-name"> {this.props.item.name} </span>
            ;

        const loadingMarker = ( !!this.props.item.isLoading ) ? 
            <i className="cct-item-loading"> ...loading... </i> : null;

        const childsArr = Object.keys(this.props.item.childs).map(
            key => <TreeNode
                key={this.props.pathStr + '/' + key}
                pathStr={this.props.pathStr + '/' + this.props.item.id}
                item={this.props.item.childs[key]}
                onTriggerOpen={this.props.onTriggerOpen}
                onTriggerSelected={this.props.onTriggerSelected}
            />
        );
        const childs = !iswithChilds ? null : (<div key={this.props.item.id} className="cct-item-childs">{childsArr}</div>);

        return (
            <div className={classAdd}>
                {arrButton}
                <span className="cct-item-selected" onClick={this.triggerSelected}> {this.props.item.isSelected ? '[V]' : '[ ]'} </span>
                <span className="cct-item-code"> {this.props.item.id} </span>
                {nameBlock}
                {loadingMarker}
                {childs}
            </div>
        );
    }
}

TreeNode.propTypes = {
    pathStr: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    onTriggerOpen: PropTypes.func.isRequired,
    onTriggerSelected: PropTypes.func.isRequired
}

class ClassModal extends React.Component {

    constructor(props) {
        super(props);

        this.init = this.init.bind(this);
        this.triggerItemOpen = this.triggerItemOpen.bind(this);
        this.triggerItemSelected = this.triggerItemSelected.bind(this);
        this.expandSelected = this.expandSelected.bind(this);
        this.searchUpdated = this.searchUpdated.bind(this);
        this._loadLevel = this._loadLevel.bind(this);

        // hide base input
        this.state = { values: [], tree: {}, searchTerm: '', isLoading: false };

    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.values != prevState.values) this.storeData();
    //     const isChangedSelected = (this.state.values.length !== prevState.values.length);
    //     console.log( 'isChangedSelected', isChangedSelected );


    // }

    componentDidMount() {
        if (!!this.props.onComponentMount) this.props.onComponentMount(this.props.id);

        this.init();
    }

    _getCurPlace(tree, path, code) {

        // normalize
        if (!Array.isArray(path)) path = path.split('/');
        if (!parseInt(path[0])) path.shift(); // remove zero from begin 
        if (!!code && path[path.length - 1] !== code) path.push(code); // add passed code to path

        let curPlace = tree[path[0]];
        for (let i = 1; i < path.length; i++) {
            if (!curPlace.childs[path[i]]) return false;
            curPlace = curPlace.childs[path[i]];
        }

        return curPlace;
    }

    async triggerItemOpen(pathStr, code) {
        let tree = Object.assign({}, this.state.tree);
        const curPlace = this._getCurPlace(tree, pathStr, code);

        if (!!curPlace.isOpen) {
            curPlace.childs = {}
        } else {
            curPlace.isLoading = true;
            this.setState({ tree });
            const subTree = await this._loadLevel(code);
            curPlace.isLoading = false;
            curPlace.childs = subTree;
        }

        curPlace.isOpen = !curPlace.isOpen;

        this.setState({ tree });
    }

    triggerItemSelected(pathStr, code) {

        let tree = Object.assign({}, this.state.tree);
        const curPlace = this._getCurPlace(tree, pathStr, code);

        let values = this.state.values;
        if (!curPlace.isSelected)
            values.push(code);
        else {
            const index = values.indexOf(code);
            if (index > -1) values.splice(index, 1);
        }

        curPlace.isSelected = !curPlace.isSelected;

        this.setState({ tree, values });
        this.storeData();

        if (!!this.props.onTriggerItemSelection)
            this.props.onTriggerItemSelection(pathStr, curPlace);
    }

    _loadLevel(code) {
        return new Promise((resolve, reject) => {
            if (!code) code = '0';

            this.props.loadTreeLevel.call(this, this.props.id, code, (err, treeBase) => {

                if (!!err) return reject(err);
                resolve(
                    treeBase.reduce((prev, item) => {
                        prev[item.id] = Object.assign({ childs: {} }, item);
                        return prev;
                    }, {})
                );
            });

        });

        // const treeBase = await this.props.loadTreeLevel(this.props.id, code);
        // const tree = treeBase.reduce((prev, item) => {
        //     prev[item.id] = Object.assign({ childs: {} }, item);
        //     return prev;
        // }, {});
        // return tree;
    }

    async init() {
        this.setState({ isLoading: true });

        let tree = await this._loadLevel();

        const values = await this.props.extractData(this.props.id);

        this.setState({ values, tree, isLoading: false });

        if (!!this.props.getSelectedPaths) {

            this.props.getSelectedPaths.call(this, this.props.id, values, async (err, paths) => {

                if (!!err) return;

                if (!Array.isArray(paths)) {
                    console.error('Expected getSelectedPaths method return array of arrays of path for selected items');
                    return;
                }

                const tree = await this.markSelectedPaths(this.state.tree, this.state.values, paths);

                this.setState({ tree });
            });
        }
    }

    async expandSelected() {
        if (!this.props.getSelectedPaths) return false;
        const paths = await this.props.getSelectedPaths(this.props.id, this.state.values);
        if (!Array.isArray(paths)) throw new Error('Expected getSelectedPaths method return array of arrays of path for selected items');
        let tree = Object.assign({}, this.state.tree);

        tree = await this.markSelectedPaths(tree, this.state.values, paths);
        this.setState({ tree });
    }

    async markSelectedPaths(tree, values, pathArr) {

        for (let i = 0; i < pathArr.length; i++) {
            const path = pathArr[i];

            tree[path[0]].isOpen = true;
            let curPlace = tree[path[0]];

            for (let i = 1; i < path.length; i++) {

                if (Object.keys(curPlace.childs).length === 0) {
                    // load tree level
                    curPlace.isLoading = true; this.setState({tree});
                    curPlace.childs = await this._loadLevel(curPlace.id);
                    curPlace.isLoading = false; 
                }

                if (!curPlace.childs[path[i]]) throw new Error('Path collision!'); // EXCEPTION!
                curPlace.isOpen = true;

                curPlace = curPlace.childs[path[i]];
            }

            curPlace.isSelected = true;

        };

        return tree;
    }

    storeData() {
        this.props.storeData(this.props.id, this.state.values);
        this.props.onStoreData(this.props.id);
    }

    searchUpdated(term) {

        this.setState({ searchTerm: term });

    }

    render() {

        const nodes = Object.keys(this.state.tree).map(
            key => <TreeNode
                key={this.props.id + key}
                pathStr="0"
                item={this.state.tree[key]}
                onTriggerOpen={this.triggerItemOpen}
                onTriggerSelected={this.triggerItemSelected}
            />
        );

        const title = (this.props.title ? this.props.title : this.props.id);

        return (
            <section id="cct-classifier-modal">
                <header>
                    {title}
                    <span className="cct-button" id="cct-expand-selected" onClick={this.expandSelected}>expand selected</span>
                    <span className="cct-button" id="cct-close" onClick={this.props.close}>close</span>
                    <SearchInput className="search-input" onChange={this.searchUpdated} />
                </header>
                <div id="cct-tree-wrapper">
                    {nodes}
                </div>
                <footer></footer>
            </section>
        );
    }
}

ClassModal.propTypes = {
    id: PropTypes.string.isRequired,
    loadTreeLevel: PropTypes.func.isRequired,
    extractData: PropTypes.func.isRequired,
    storeData: PropTypes.func.isRequired,
    title: PropTypes.string,
    getSelectedPaths: PropTypes.func,
    onTriggerItemSelection: PropTypes.func,
    onSearch: PropTypes.func,
    close: PropTypes.func,
}

module.exports = {
    ClassModal,
    TreeNode
};
