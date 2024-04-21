import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homePage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponents from './LoadingComponents';

function App() {
  const location = useLocation();

  const {commonStore, userStore} = useStore();

  useEffect(() => {
    console.log("Loading app...");
    if (commonStore.token) {
      console.log("Found a token in the common store");
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      console.log("No token found in the common store");
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) {
    return <LoadingComponents content='Loading app...'/>
  }

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored'/>
      {location.pathname === '/' ? <HomePage/> : (
        <>
          <NavBar/>
          <Container style={{marginTop: '7em'}}>
            <Outlet/>
          </Container>
        </>
      )}
    </>
  )
}

export default observer(App);
