import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

/* eslint-disable no-console */

export default {
  move(data){
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.MOVED,
      data
    })
  },
  rotate(data){
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.ROTATED,
      data
    })
  },
  markCell(data){
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.CELL_SELECTED,
      data
    })
  }
};
