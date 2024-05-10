import { Button, Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useEffect, useState } from "react";
import ActivityFilters from "./ActivityFilters";
import { PagingParams } from "../../../app/models/pagination";

export default observer(function ActivityDashboard()
{
    const {activityStore} = useStore();
    const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        loadActivities().then(() => setLoadingNext(false));
    }

    // Triggers when component is rendered
    useEffect(() => {
        // This is a workaround for when you refresh the page when viewing a single activity
        if (activityRegistry.size <= 1) {
            loadActivities();
        }
    }, [activityRegistry.size, loadActivities])

    if (activityStore.loadingInitial && !loadingNext) 
    {
        return <LoadingComponents content='Loading activities...'/>
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
                <Button 
                    floated="right"
                    content="More..."
                    positive
                    onClick={handleGetNext}
                    loading={loadingNext}
                    disabled={pagination?.totalPages === pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters/>
            </Grid.Column>
        </Grid>
    )
})