import PropTypes from 'prop-types';
import { ActionDefinitions } from './lib/actions';

export default <ActionDefinitions>{
  openSettings: {
    path: PropTypes.string,
  },
  closeSettings: {},
  openEmailSelector: {
    mail: PropTypes.string,
  },
  closeEmailSelector: {},
  openPhoneSelector: {
    phone: PropTypes.string,
  },
  closePhoneSelector: {},
  openServiceSelector: {
    url: PropTypes.string,
    domain: PropTypes.string,
  },
  closeServiceSelector: {},
  toggleServiceUpdatedInfoBar: {
    visible: PropTypes.bool,
  },
};
