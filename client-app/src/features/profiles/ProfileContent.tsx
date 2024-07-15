import { Tab, TabPane } from "semantic-ui-react";
import React from "react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../app/models/profile";
import { observer } from "mobx-react-lite";
import ProfileAboutContent from "./ProfileAboutContent";

interface Props {
  profile: Profile;
}

export default observer(function ProfileContent({ profile }: Props) {
  const panes = [
    { menuItem: "About", render: () => <ProfileAboutContent profile={profile} /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <TabPane>Events Content</TabPane> },
    {
      menuItem: "Followers",
      render: () => <TabPane>Followers Content</TabPane>,
    },
    {
      menuItem: "Following",
      render: () => <TabPane>Following Content</TabPane>,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
});
