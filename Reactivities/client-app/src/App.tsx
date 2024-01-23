import './App.css'
import { ducks } from './demo'
import DuckItem from './duckItem'

function App() {
  return (
    <div>
      <h1>Reactivities</h1>
      {/* For each duck in ducks from demo.ts */}
      {ducks.map(duck => (
        // Pass a instantiated duck element into the DuckItem function
        <DuckItem duck={duck}></DuckItem>
      ))}
    </div>
  )
}

export default App
