import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetailedHeader from './ActivityDetailedHeader';
import ActivityDetailedInfo from './ActivitiyDetailedInfo';
import ActivityDetailedChats from './ActivityDetailedChats';
import ActivityDetailedSidebar from './ActivityDetailedSidebar';

export default observer (function ActivityDetails()
{
    const {activityStore} = useStore();
    const {selectedActivity, loadActivity, loadingInitial, clearSelectedActivity} = activityStore;
    // Pull from URL
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
        return () => {
            clearSelectedActivity();
        }
    }, [id, loadActivity, clearSelectedActivity])
  
    // Show loading as activity is loading
    if (loadingInitial || !selectedActivity) {
        return <LoadingComponents/>;
    }

    return (  
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={selectedActivity}/>
                <ActivityDetailedInfo activity={selectedActivity}/>
                <ActivityDetailedChats activityId={selectedActivity.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar activity={selectedActivity}/>
            </Grid.Column>
        </Grid>
    )
});