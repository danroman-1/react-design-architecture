import { combineReducers } from 'redux';

import helmet from './helmet';
import search from './search';
import theme from './theme';
import media from './media';
import drawer from './drawer';
import quickNav from './quickNav';
import sassdocs from './sassdocs';
import routing from './routing'; // until react-router-redux@5

export default combineReducers({
  helmet,
  theme,
  search,
  media,
  drawer,
  quickNav,
  sassdocs,
  routing,
});
