import { Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useStore } from "../../app/stores/store";
import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";

export default observer(function ProfilePage() {
  const { username } = useParams<{ username: string }>(); // preko useparams hooka uzima username parametar iz url
  const { profileStore } = useStore(); // pristupa profilestore iz mobxa preko usestore hooka
  const { loadingProfile, loadProfile, profile } = profileStore; // 

  useEffect(() => {
    if (username) {
      loadProfile(username); // gleda da li username postoji i onda zove loadprofile funkciju ispod  sa username da loaduje data
    }
  }, [loadProfile, username]);

  if (loadingProfile) return <LoadingComponent content="Loading profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && ( // ako profile nije null renderuje profil 
          <>
            <ProfileHeader profile={profile} />
            <ProfileContent profile={profile} />
          </>
        )}
      </Grid.Column>
    </Grid>
  );
});
