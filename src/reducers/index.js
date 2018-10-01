const initStates = {
  repositorios: [],
  noRepositorio: false,
  numStars: 0,
  numForks: 0,
  numContribs: 0,
  relCommits: 0,
  colMeses: 0,
  rowCommits: 0
};

function reducer(state = initStates, action) {
  switch (action.type) {
    case "BOXNUMEROS":
      return Object.assign({}, state, {
        numStars: action.numStars,
        numForks: action.numForks,
        numContribs: action.numContribs
      });
    case "MUDAGRAFICO":
      return Object.assign({}, state, {
        relCommits: action.relCommits,
        colMeses: action.colMeses,
        rowCommits: action.rowCommits
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
