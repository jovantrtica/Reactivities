import { Card, CardContent, Icon, Image } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import FollowButton from "./FollowButton";

interface Props {
  profile: Profile;
}

export default observer( function ProfileCard({ profile }: Props) {
  return (
    <Card as={Link} to={`/profiles/${profile.username}`}>
      <Image src={profile.image || "/assets/user.png"} />
      <CardContent>
        <Card.Header>{profile.displayName}</Card.Header>
        <Card.Description>Bio goes here</Card.Description>
      </CardContent>
      <Card.Content extra>
        <Icon name='user'/>
        {profile.followersCount} {profile.followersCount === 1 ? "follower" : "followers"}
      </Card.Content>
      <FollowButton profile={profile}/>
    </Card>
  );
})
