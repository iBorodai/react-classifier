import PropTypes from 'prop-types';

const propTypesChips = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string,
    clickHandler: PropTypes.func,
    isLoading: PropTypes.bool,
}

export default propTypesChips;