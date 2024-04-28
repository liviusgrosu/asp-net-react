import { Button, Grid, Header, Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";

interface Props {
    profile: Profile;
}

export default observer (function ProfileBio({profile}: Props) {
    const {profileStore: {isCurrentUser, updateProfile}} = useStore();
    const [updatingBio, setUpdatingBio] = useState(false);

    const validationSchema = Yup.object({
        displayName: Yup.string().required('Display name is required')
    })

    function handleFormSubmit(profile: Partial<Profile>) {
        updateProfile(profile).then(() => setUpdatingBio(false));
    }

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated="left" icont='user' content={`About ${profile.displayName}`}/>
                    {isCurrentUser && (
                        <Button floated="right" basic 
                            content={updatingBio ? 'Cancel': 'Edit Profile'}
                            onClick={() => {setUpdatingBio(!updatingBio)}}
                        />
                    )}
                </Grid.Column>
                {updatingBio ? (
                    <Grid.Column width={16}>
                        <Formik validationSchema={validationSchema}
                            enableReinitialize 
                            initialValues={{displayName: profile.displayName, bio: profile.bio}} 
                            onSubmit={values => handleFormSubmit(values)}>
                        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                                    <MyTextInput name='displayName' placeholder="Display Name"/>
                                    <MyTextArea name='bio' rows={3} placeholder='Bio'/>
                                    <Button 
                                        disabled= {isSubmitting || !dirty || !isValid}
                                        loading={isSubmitting} floated='right' 
                                        positive type='submit' content='Submit'/>
                                </Form>
                            )}
                        </Formik>
                    </Grid.Column>
                ) : (
                    <Grid.Column width={16}>
                        <p>{profile.bio}</p>
                    </Grid.Column>
                )}
            </Grid>
        </Tab.Pane>
    )
})