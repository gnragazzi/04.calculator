const reducer = (state, action) => {
  let newNum
  let operator
  let result
  const round = (num) => {
    return Math.round((num + Number.EPSILON) * 10000) / 10000
  }
  const setTotal = () => {
    console.log('tempNum', state.tempNum)
    console.log('currNum', state.currNum)
    console.log(state.op)
    if (state.op === '+') {
      return round(parseFloat(state.tempNum) + parseFloat(state.currNum))
    }
    if (state.op === '-') {
      return round(parseFloat(state.tempNum) - parseFloat(state.currNum))
    }
    if (state.op === '*') {
      return round(parseFloat(state.tempNum) * parseFloat(state.currNum))
    }
    if (state.op === '/') {
      return round(parseFloat(state.tempNum) / parseFloat(state.currNum))
    }
    if (!state.op) {
      return round(parseFloat(state.currNum))
    }
    parseFloat()
  }

  switch (action.type) {
    // DONE SO FAR
    // OP
    case 'NEGATIVE_NUM':
      console.log('negative')

      newNum = `-`
      return {
        ...state,
        tempNegative: state.currNum,
        currNum: newNum,
        isReset: false,
        isNegative: false,
      }
    case 'EQUALS_OP':
      console.log('equal ops')
      result = setTotal()
      return {
        ...state,
        tempNum: result,
        currNum: result,
        tempNum: result,
        isReset: true,
        isDecimal: false,
        op: action.payload,
        isNegative: true,
      }
    case 'SET_OP':
      console.log('set op')
      return {
        ...state,
        tempNum: state.currNum,
        isReset: true,
        op: action.payload,
        isNegative: true,
      }
    case 'RESET_OP':
      console.log('reset op')
      return {
        ...state,
        op: action.payload,
        isNegative: true,
      }
    case 'RESET_NEGATIVE_OP':
      newNum = state.tempNegative
      return {
        ...state,
        op: action.payload,
        isNegative: true,
        currNum: newNum,
        tempNegative: 0,
        isReset: true,
      }
    // DECIMAL
    case 'RESET_NUM_DECIMAL':
      console.log('reset num decimal')
      return {
        ...state,
        isDecimal: true,
        isReset: false,
        currNum: '0.',
        isNegative: false,
      }
    case 'DECIMAL':
      console.log('decimal')
      newNum = `${state.currNum + action.payload}`
      return {
        ...state,
        isDecimal: true,
        currNum: newNum,
        isNegative: false,
      }
    // NUMBERS
    case 'RESET_CURR_NUM':
      return {
        ...state,
        currNum: action.payload,
        isReset: false,
        isDecimal: false,
        isNegative: false,
      }
    case 'ADD_NUM':
      if (state.currNum == '0') {
        newNum = action.payload
      } else {
        newNum = state.currNum + action.payload
      }
      return {
        ...state,
        currNum: newNum,
        isNegative: false,
      }
    // RESULT
    case 'EQUALS':
      console.log('equals')
      result = setTotal()
      return {
        ...state,
        op: false,
        currNum: result,
        tempNum: result,
        isReset: true,
        isDecimal: false,
        isNegative: false,
      }
    case 'CLEAR':
      console.log('clear')
      return {
        ...action.payload,
      }
    default:
      console.log('default')
      return { ...state }
  }
}

export default reducer
