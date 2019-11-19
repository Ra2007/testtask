const initialState = {
  activeTest: 0,
  resultatTest: {}
};

const tests = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_TEST':
      return {
        ...state,
        activeTest: action.payload
      };

    case 'SET_RESULTAT_TEST':
      return {
        ...state,
        resultatTest: { ...state.resultatTest, ...action.payload }
      };

    default:
      return state;
  }
};

export default tests;
