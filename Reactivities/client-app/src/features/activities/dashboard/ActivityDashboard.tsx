import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";

export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();
    const {selectedActivity, editMode} = activityStore;

    // Triggers when component is rendered
    useEffect(() => {
      activityStore.loadActivities();
    }, [activityStore])
  
  
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
                {/* Show the activity if its selected and being updated or a new one is created */}
                {selectedActivity && !editMode && <ActivityDetails/>}
                {editMode && <ActivityForm/>}
            </Grid.Column>
        </Grid>
    )
})