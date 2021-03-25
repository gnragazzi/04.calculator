import React from 'react'
import data from './data'

function App() {
  return (
    <main>
      <article className='calculator'>
        <div className='display' id='display'>
          <p className='display-result'>0</p>
        </div>
        <div className='calc-container'>
          {data.map((item) => {
            return (
              <button className='calc-btn' id={item.name}>
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
