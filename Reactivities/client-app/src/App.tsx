import './App.css'
import { ducks } from './demo'
import DuckItem from './duckItem'

function App() {
  return (
    <div>
      <h1>Reactivities</h1>
      {ducks.map(duck => (
        <DuckItem duck={duck}></DuckItem>
      ))}
    </div>
  )
}

export default App
