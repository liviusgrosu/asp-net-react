import React from 'react';
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
  import { Activity } from '../../../app/models/activity';

interface Props{
    activity : Activity
}

export default function ActivityDetails({activity} : Props)
{
    return (  
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}/>
            <CardContent>
                <CardHeader>{activity.title}</CardHeader>
                <CardMeta>
                    <span>{activity.date}</span>
                </CardMeta>
                <CardDescription>
                    {activity.description}
                </CardDescription>
            </CardContent>
            <CardContent extra>
                <ButtonGroup widths='2'>
                    <Button basic color='blue' content='Edit'/>
                    <Button basic color='blue' content='Cancel'/>
                </ButtonGroup>
            </CardContent>
        </Card>
    )
}