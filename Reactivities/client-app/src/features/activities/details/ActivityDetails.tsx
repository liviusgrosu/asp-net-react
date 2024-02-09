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

export default function ActivityDetails()
{
    const {activityStore} = useStore();
    const {selectedActivity, openForm, cancelSelectedActivity} = activityStore;

    if (!selectedActivity) {
        return <LoadingComponents/>;
    }

    console.log('opening details...');

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
                    <Button onClick={() => openForm(selectedActivity.id)} basic color='blue' content='Edit'/>
                    <Button onClick={() => cancelSelectedActivity()} basic color='blue' content='Cancel'/>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}