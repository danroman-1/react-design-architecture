import { PropTypes } from 'react';
import headerContextTypes from './headerContextTypes';
import omit from '../utils/omit';

const rowContextTypes = omit({
  ...headerContextTypes,
  rowId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}, ['baseId']);

export default rowContextTypes;
