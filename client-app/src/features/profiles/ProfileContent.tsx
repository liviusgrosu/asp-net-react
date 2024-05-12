import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileBio from "./ProfileBio";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../app/stores/store";
import ProfileEvents from "./ProfileEvents";

interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile}: Props) {
    
    const {profileStore} = useStore();
    
    const panes = [
        {menuItem: 'About', render: () => <ProfileBio profile={profile}/>},
        {menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/>},
        {menuItem: 'Events', render: () => <ProfileEvents/>},
        {menuItem: 'Followers', render: () => <ProfileFollowings/>},
        {menuItem: 'Following', render: () => <ProfileFollowings/>},
    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition="right"
            panes={panes}
            onTabChange={(_, data) => profileStore.setActiveTab(data.activeIndex as number)}
        />
    )
})