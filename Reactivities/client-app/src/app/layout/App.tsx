import { useState, useEffect } from 'react'
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponents from './LoadingComponents';

function App() {
  // [] is an empty default value
  const [activities, setActivites] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Triggers when component is rendered
  useEffect(() => {
    // Get the API request for all activities in the DB
    agent.Activities.list().then(response => {
        let activities: Activity[] = [];
        // Don't include the time
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0]
          // We do this because response.date is read only
          activities.push(activity);
        })
        // Store that in this state
        setActivites(activities);
        setLoading(false);
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
      : setActivites([...activities, {...activity, id: uuid()}]); // Add to the list of activities

    // Hide the edit form 
    setEditMode(false);
    // Show the updated/new activity
    setSelectedActivity(activity);
  }

  function handleDeleteActivity(id: string) 
  {
    setActivites([...activities.filter(x => x.id !== id)]);
  }

  if (loading) 
  {
    return <LoadingComponents content='Loading app'/>
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
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
