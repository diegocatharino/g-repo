const initStates = {
  repositorios: [],
  noRepositorio: false,
  numStars: 0,
  numForks: 0,
  numContribs: 0
};

function reducer(state = initStates, action) {
  switch (action.type) {
    case "BOXNUMEROS":
      return Object.assign({}, state, {
        numStars: action.numStars,
        numForks: action.numForks,
        numContribs: action.numContribs
      });
    case "CADAREPOSITORIO":
      return Object.assign({}, state, {
        noRepositorio: true,
        repositorios: action.payload
      });
    default:
      return state;
  }
  return state;
}

export default reducer;
