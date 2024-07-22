import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../activities/form/MyTextArea";
import { Profile } from "../../app/models/profile";
import * as Yup from "yup";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

export default observer(function ProfileAboutContent({ profile }: Props) {
  const { profileStore } = useStore();
  const { updateProfile } = profileStore;
  const [isEditMode, setIsEditMode] = useState(false);

  async function handleUpdateProfile(profile: Profile) {
    console.log(profile);
    await updateProfile(profile);
    setIsEditMode(false);
  }

  const validationSchema = Yup.object({
    displayName: Yup.string().required("Name is required"),
  });

  return (
    <Segment clearing className="profile-about-container">
      <Header floated="left">
        <Icon name="user" />
        <span>About {profile.displayName}</span>
        <Button
          onClick={() => setIsEditMode(!isEditMode)}
          floated="right"
          type="button"
          content={isEditMode ? "Cancel" : "Edit Profile"}
        />
      </Header>

      {isEditMode ? (
        <Formik
          validationSchema={validationSchema}
          initialValues={profile}
          onSubmit={(values) => {
            console.log(values);
            handleUpdateProfile(values);
          }}
        >
          {({ handleSubmit, isValid, isSubmitting, dirty }) => (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <MyTextInput name="displayName" placeholder="Name" />

              <MyTextArea
                rows={3}
                placeholder="Bio"
                name="bio"
              />

              <Button
                disabled={isSubmitting || !dirty || !isValid}
                loading={isSubmitting}
                floated="right"
                positive
                type="submit"
                content="Update profile"
               
              />
            </Form>
          )}
        </Formik>
      ) : (
        <div>
          <span>{profile.bio}</span>
        </div>
      )}
    </Segment>
  );
});
