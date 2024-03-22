import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";
import {v4 as uuid} from 'uuid';

// activity: selectedActivity is put in as a rename because we have a hook for the current data object that we're editing
export default observer (function ActivityForm()
{
    const {activityStore} = useStore();
    const { loading, 
            createActivity, 
            updateActivity, 
            loadActivity, 
            loadingInitial
        } = activityStore;

    const {id} = useParams();
    // Hook that navigates back to certain parts of the site (basically <Link/>)
    const navigate = useNavigate();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            const newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
        }
    }


    if (loadingInitial)
    {
        return <LoadingComponents content="Loading activities..."/>
    }

    return (
        <Segment clearing>
            <Header content='Activity Details' sub color="teal"/>
            <Formik validationSchema={validationSchema}
                    enableReinitialize 
                    initialValues={activity} 
                    onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder="Title"/>
                        <MyTextArea name='description' rows={3} placeholder='Description'/>
                        <MySelectInput name='category' options={categoryOptions} placeholder='Category'/>
                        <MyDateInput 
                            name='date'
                            placeholderText='Date' 
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content='Location Details' sub color="teal"/>
                        <MyTextInput name='city' placeholder='City'/>
                        <MyTextInput name='venue' placeholder='Venue'/>
                        <Button 
                            disabled= {isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' 
                            positive type='submit' content='Submit'/>
                        <Button as={Link} to='/activities' floated='right' positive type='button' content='cancel'/>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})