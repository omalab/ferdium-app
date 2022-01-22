import PropTypes from 'prop-types';

export default {
  openSettings: {
    path: PropTypes.string,
  },
  closeSettings: {},
  openEmailSelector: {
    mail: PropTypes.string,
  },
  closeEmailSelector: {},
  openServiceSelector: {
    url: PropTypes.string,
    domain: PropTypes.string,
  },
  closeServiceSelector: {},
  toggleServiceUpdatedInfoBar: {
    visible: PropTypes.bool,
  },
};
