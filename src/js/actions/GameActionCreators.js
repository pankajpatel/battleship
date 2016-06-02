import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {
  moved(data){
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.MOVED,
      data
    })
  },
  rotated(data){
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.ROTATED,
      data
    })
  },
  cell_selected(data){
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.CELL_SELECTED,
      data
    })
  }
};
