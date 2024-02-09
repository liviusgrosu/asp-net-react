import { useEffect } from 'react'
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponents from './LoadingComponents';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {activityStore} = useStore();

  // Triggers when component is rendered
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])


  if (activityStore.loadingInitial) 
  {
    return <LoadingComponents content='Loading app'/>
  }

  return (
    <>
      <NavBar/>
      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard/>
      </Container>
    </>
  )
}

export default observer(App);
