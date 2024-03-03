import {
    CardMeta,
    CardHeader,
    CardDescription,
    CardContent,
    Card,
    Image,
    Button,
    ButtonGroup
  } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import LoadingComponents from '../../../app/layout/LoadingComponents';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

export default observer (function ActivityDetails()
{
    const {activityStore} = useStore();
    const {selectedActivity, loadActivity, loadingInitial} = activityStore;
    // Pull from URL
    const {id} = useParams();

    useEffect(() => {
        if (id) {
            loadActivity(id);
        }
    }, [id, loadActivity])
  
    // Show loading as activity is loading
    if (loadingInitial || !selectedActivity) {
        return <LoadingComponents/>;
    }

    return (  
        <Card fluid>
            <Image src={`/assets/categoryImages/${selectedActivity.category}.jpg`}/>
            <CardContent>
                <CardHeader>{selectedActivity.title}</CardHeader>
                <CardMeta>
                    <span>{selectedActivity.date}</span>
                </CardMeta>
                <CardDescription>
                    {selectedActivity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <ButtonGroup widths='2'>
                    <Button as={Link} to={`/manage/${selectedActivity.id}`} basic color='blue' content='Edit'/>
                    <Button as={Link} to='/activities' basic color='blue' content='Cancel'/>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
});