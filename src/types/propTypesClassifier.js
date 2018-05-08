import PropTypes from 'prop-types';

const ReactInputParamTypes = {
    values: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string
    })),
    // handlers
    changeHandler: PropTypes.func.isRequired,
    // UI props
    isLoading: PropTypes.bool,
}

export default ReactInputParamTypes;