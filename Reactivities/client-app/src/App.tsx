import axios from 'axios';
import './App.css'
import { useState, useEffect } from 'react'

// import { ducks } from './demo'
// import DuckItem from './duckItem'

function App() {
  // [] is an empty default value
  const [activities, setActivites] = useState([]);

  // Triggers when component is rendered
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivites(response.data)
      })
  }, []);

  return (
    <div>
      <h1>Reactivities</h1>
      <ul>
        {activities.map((activity: any) => (
          <li key={activity.id}>
            {activity.title}
          </li>
        ))}
      </ul>
    </div>
    // <div>
    //   
    //   {/* For each duck in ducks from demo.ts */}
    //   {ducks.map(duck => (
    //     // Pass a instantiated duck element into the DuckItem function
    //     <DuckItem duck={duck}></DuckItem>
    //   ))}
    // </div>
  )
}

export default App
