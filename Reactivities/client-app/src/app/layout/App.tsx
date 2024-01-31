import { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import { Container, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

// import { ducks } from './demo'
// import DuckItem from './duckItem'

function App() {
  // [] is an empty default value
  const [activities, setActivites] = useState<Activity[]>([]);

  // Triggers when component is rendered
  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        setActivites(response.data);
      })
  }, []);

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard activities={activities}/>
      </Container>
    </>
  )
}

export default App
