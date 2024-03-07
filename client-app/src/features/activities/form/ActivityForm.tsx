import { useEffect, useState } from "react";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";

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

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) {
            // ! = cannot be null
            loadActivity(id).then(activity => setActivity(activity!));
        }
    }, [id, loadActivity])

    // Call back the edit function in activityForm and add to activity list
    // function handleSubmit() {
    //     if (!activity.id) {
    //         activity.id = uuid();
    //         createActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     } else {
    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`));
    //     }
    // }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value})
    // }

    if (loadingInitial)
    {
        return <LoadingComponents content="Loading activities..."/>
    }

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema}
                    enableReinitialize 
                    initialValues={activity} 
                    onSubmit={values => console.log(values)}>
                {({ handleSubmit }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='title' placeholder="Title"/>
                        <MyTextArea rows={3} placeholder='Description' name='description'/>
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category'/>
                        <MyTextInput placeholder='Date' name='date'/>
                        <MyTextInput placeholder='City' name='city'/>
                        <MyTextInput placeholder='Venue' name='venue'/>
                        <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
                        <Button as={Link} to='/activities' floated='right' positive type='button' content='cancel'/>
                    </Form>
                )}
            </Formik>

        </Segment>
    )
})