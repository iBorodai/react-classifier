import PropTypes from 'prop-types';

const propTypesModal = {
    id: PropTypes.string.isRequired,
    classifierId: PropTypes.string.isRequired,
    reactContainerSelector: PropTypes.string.isRequired,
    // relatedComponentId: PropTypes.string.isRequired,
    storeData: PropTypes.func.isRequired,
    extractData: PropTypes.func,
    loadTreeLevel: PropTypes.func,
    getSelectedPaths: PropTypes.func,
    getSearchResult: PropTypes.func,
}

export default propTypesModal;