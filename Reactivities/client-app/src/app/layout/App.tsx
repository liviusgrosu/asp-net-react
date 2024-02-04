import { useState, useEffect, Fragment } from 'react'
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';

function App() {
  // [] is an empty default value
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  // Triggers when component is rendered
  useEffect(() => {
    // Get the API request for all activities in the DB
    axios.get<Activity[]>('http://localhost:5000/api/activities')
      .then(response => {
        // Store that in this state
        setActivites(response.data);
      })
  }, []);

  function handleSelectActivity(id: string)
  {
    // Set the currently selected activity with the ID provided
    setSelectedActivity(activities.find(x => x.id === id));
  }

  function handleCancelSelectActivity()
  {
    // Hide the activity card
    setSelectedActivity(undefined);
  }

  function handleFormOpen(id?: string)
  {
    // This will either show a card of an activity or close it
    // In the case of a new activity, it will close something thats not there
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    // Show the edit form
    setEditMode(true);
  }

  function handleFormClose()
  {
    // Hide the edit form
    setEditMode(false);
  }

  function handleCreateOrEditActivity(activity: Activity)
  {
    // T - Assign new list with all activites not this one + this one
    // F - Add new activity to list
    activity.id 
      ? setActivites([...activities.filter(x => x.id !== activity.id), activity]) 
      : setActivites([...activities, activity]); // Add to the list of activities

    // Hide the edit form 
    setEditMode(false);
    // Show the updated/new activity
    setSelectedActivity(activity);
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditActivity}
        />
      </Container>
    </>
  )
}

export default App
