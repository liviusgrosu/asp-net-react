import { observer } from 'mobx-react-lite';
import { Card, Grid, Header, Tab } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import { useEffect } from 'react';
import ProfileActivityCard from './ProfileActivityCard';

export default observer(function ProfileEvents() {

    const {profileStore} = useStore();
    const {loadActivities, loadingActivities, activities} = profileStore;
    
    useEffect(() => {
        loadActivities('');
    }, [loadActivities]);

    const panes = [
        { menuItem: 'Future events', key: '' },
        { menuItem: 'Past events', key: 'past' },
        { menuItem: 'Hosting', key: 'hosting' },
    ];

    return (
        <Tab.Pane loading={loadingActivities}>
            <Grid>
                <Grid.Column width={16}>
                    <Header 
                        floated='left' 
                        icon='calendar' 
                        content='Activities'
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab 
                        menu={{ secondary: true, pointing: true }} 
                        panes={panes} 
                        onTabChange={(_, data) => loadActivities(panes[data.activeIndex as number].key)}
                    />
                    <br/>
                    <Card.Group itemsPerRow={4}>
                        {activities.map(activity => (
                            <ProfileActivityCard key={activity.title} activity={activity}/>
                        ))}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
})