import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useEffect } from "react";

export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
  
    // Triggers when component is rendered
    useEffect(() => {
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [loadActivities, activityRegistry.size])

    if (activityStore.loadingInitial) 
    {
      return <LoadingComponents content='Loading app'/>
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Activity filters</h2>
            </Grid.Column>
        </Grid>
    )
})