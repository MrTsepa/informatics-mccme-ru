const initialState = {
  search: {},
  groups: {},
  filterGroup: undefined,
};


export default function reducer(state=initialState, action) {
  switch (action.type) {
    case 'GET_GROUP_SEARCH_FULFILLED':
      const { uid } = action.meta;
      return {
        ...state,
        search: {
          ...state.search,
          [uid]: action.payload.data,
        }
      };

    case 'GET_GROUP_FULFILLED':
      const { groupId } = action.meta;
      return {
        ...state,
        groups: {
          ...state.groups,
          [groupId]: action.payload.data,
        }
      };

    case 'GET_GROUP_STUDENTS_FULFILLED':
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.meta.groupId]: {
            ...state.groups[action.meta.groupId],
            students: action.payload.data
          },
        }
      };

    case 'GET_GROUP_TEACHERS_FULFILLED':
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.meta.groupId]: {
            ...state.groups[action.meta.groupId],
            teachers: action.payload.data
          },
        }
      };

    case 'GET_GROUP_INVITES_FULFILLED':
      return {
        ...state,
        groups: {
          ...state.groups,
          [action.meta.groupId]: {
            ...state.groups[action.meta.groupId],
            invites: action.payload.data
          },
        }
      };

    case 'SET_GROUP_FILTER':
      return {
        ...state,
        filterGroup: action.payload.group,
      }
  }
  return state;
}
