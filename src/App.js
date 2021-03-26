import { useEffect, useReducer } from 'react'
import data from './data'
import reducer from './reducer'

const defaultState = {
  currNum: 0, //done
  tempNum: 0, //DONE
  op: '', //DONE
  isReset: false, //done
  isDecimal: false, //
  isNegative: false, //work
  tempNegative: 0,
}

function App() {
  const [state, dispatch] = useReducer(reducer, defaultState)
  const handleClick = (e) => {
    const type = e.currentTarget.dataset.type
    const value = e.currentTarget.dataset.value
    // OPERATOR INPUT
    if (type === 'operator' && !state.op && !state.isReset) {
      dispatch({ type: 'SET_OP', payload: value })
    } else if (
      type === 'operator' &&
      state.op &&
      value === '-' &&
      state.isNegative
    ) {
      dispatch({ type: 'NEGATIVE_NUM', payload: value })
    } else if (type === 'operator' && state.isReset) {
      dispatch({ type: 'RESET_OP', payload: value })
    } else if (type === 'operator' && state.currNum === '-') {
      dispatch({ type: 'RESET_NEGATIVE_OP', payload: value })
    } else if (type === 'operator' && state.op && !state.isReset) {
      dispatch({ type: 'EQUALS_OP', payload: value })
    }
    //3+5*6-2/4
    //5*-+5 =10
    // NUMBERS INPUT
    else if (type === 'number' && !state.isReset) {
      dispatch({ type: 'ADD_NUM', payload: value })
    } else if (type === 'number' && state.isReset) {
      dispatch({ type: 'RESET_CURR_NUM', payload: value })
    }
    // DECIMAL INPUT
    else if (type === 'decimal' && state.isDecimal) {
      dispatch({ type: '' })
    } else if (type === 'decimal' && !state.isReset) {
      dispatch({ type: 'DECIMAL', payload: value })
    } else if (type === 'decimal' && state.isReset) {
      dispatch({ type: 'RESET_NUM_DECIMAL' })
    }
    // CLEAR INPUT
    else if (type === 'clear') {
      dispatch({ type: 'CLEAR', payload: defaultState })
    }
    // EQUALS INPUT
    else if (type === 'equals') {
      dispatch({ type: 'EQUALS' })
    } else {
      console.log('no match')
      console.log(state)
    }
  }

  return (
    <main>
      <article className='calculator'>
        <div className='display'>
          <p className='display-result' id='display'>
            {state.currNum || 0}
          </p>
        </div>
        <div className='underline'></div>
        <div className='calc-container'>
          {data.map((item, index) => {
            return (
              <button
                key={index}
                onClick={handleClick}
                className={`calc-btn ${item.type} ${
                  state.op === item.symbol && 'active'
                }`}
                id={item.name}
                data-type={item.type}
                data-value={item.symbol}
              >
                {item.symbol}
              </button>
            )
          })}
        </div>
      </article>
    </main>
  )
}

export default App
