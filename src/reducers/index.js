const initStates = {
  numStars: 0,
  numForks: 0,
  numContribs: 0,
  relCommits: 0,
  colMeses: 0,
  rowCommits: 0,
  grafico: { 'cht': 'ls', 'chd': 't:', 'chs': '1000x300', 'chdls': '000000,15', 'chg': '0,10,10,10', 'chco': '0669de','chxt': 'y,x', 'chls': '5', 'chxl': '' },
  //criado com https://chart.googleapis.com/chart?cht=bvg&chs=250x150&chd=s:Monkeys&chxt=x,y&chxs=0,ff0000,12,0,lt|1,0000ff,10,1,lt 
  graficoLink: false
};

function reducer(state = initStates, action) {
  switch (action.type) {
    case "BOXNUMEROS":
      return Object.assign({}, state, {
        numStars: action.numStars, numForks: action.numForks, numContribs: action.numContribs
      });
    case "MUDAGRAFICO":
      return Object.assign({}, state, {
        relCommits: action.relCommits, colMeses: action.colMeses, rowCommits: action.rowCommits
      });
    case "CADAREPOSITORIO":
      return Object.assign({}, state, {
        repositorios: action.payload
      });
    case "GRAFICOLINK":
      return Object.assign({}, state, { 
        graficoLink: action.payload 
      });          
    default:
      return state;
  }
  return state;
}

export default reducer;
