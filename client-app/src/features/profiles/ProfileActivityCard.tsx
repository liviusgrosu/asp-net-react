import {observer} from "mobx-react-lite";
import {Link} from "react-router-dom";
import { UserActivities } from "../../app/models/userActivities";
import { Card, Image } from "semantic-ui-react";
import {format} from 'date-fns';

interface Props {
    activity: UserActivities
}

export default observer(function ProfileActivityCard({activity}: Props) {
    return (
        <Card as={Link} to={`/activities/${activity.id}`}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid className="activityImageStyle"/>
            <Card.Content>
                <Card.Header textAlign='center'>{activity.title}</Card.Header>
                <Card.Description textAlign='center'>
                    {format(activity.date!, 'do MMM yyyy')}
                    <br/>
                    {format(activity.date!, 'h:mm aa')}
                </Card.Description>
            </Card.Content>
        </Card>
    )
})
