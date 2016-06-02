import keyMirror from 'keymirror';

export default {
  // event name triggered from store, listened to by views
  CHANGE_EVENT: 'change',

  ActionTypes: keyMirror({
    MOVED: null,
    ROTATED: null,
    CELL_SELECTED: null,
    BOT_MOVED: null
  }),

  ActionSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })
};
