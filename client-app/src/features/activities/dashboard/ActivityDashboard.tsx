import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useEffect } from "react";
import ActivityFilters from "./ActivityFilters";

export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry} = activityStore;
  
    // Triggers when component is rendered
    useEffect(() => {
        // This is a workaround for when you refresh the page when viewing a single activity
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities])

    if (activityStore.loadingInitial) 
    {
        return <LoadingComponents content='Loading activities...'/>
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
})