import axios from 'axios';
import './App.css'
import { useState, useEffect } from 'react'
import { Header, List } from 'semantic-ui-react';

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
      <Header as='h2' icon='users' content='Reactivities'/>
      <List>
        {activities.map((activity: any) => (
          <List.Item key={activity.id}>
            {activity.title}
          </List.Item>
        ))}
      </List>
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
