import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../activities/form/MyTextArea";
import { isCancel } from "axios";
import ProfilePage from "./ProfilePage";
import { ActivityFormValues } from "../../app/models/activity";
import { Profile } from "../../app/models/profile";
import * as Yup from "yup";

interface Props {
  profile: Profile;
}

export default observer(function ProfileAboutContent({ profile }: Props) {
  const [isEditMode, setIsEditMode] = useState(false);

    // function handleSubmit(bio: Profile) {
    //   if (!bio.id) {
    //       let newBio = {
    //         ...bio, Id = id;
    //       };
    //       createActivity(newActivity).then(() => navigate(`/activities/${newActivity.id}`))

    //   }
    //   else {
    //     updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    //   }

    // }

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
  });

  return (
    <Segment clearing>
      <Header floated="left">
        <Icon name="user" />
        About {profile.displayName}
      </Header>

      <Button
        onClick={() => setIsEditMode(!isEditMode)}
        floated="right"
        type="button"
        content={isEditMode ? "Cancel" : "Edit Profile"}
      />

      {isEditMode ? (
        <div style={{ marginTop: "35px" }}>
          <span>
            <Formik
              validationSchema={validationSchema}
              initialValues={{ name: "", description: "" }}
              onSubmit={(values) => {
                console.log(values);
                setIsEditMode(false);
              }}
            >
              {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form
                  className="ui form"
                  onSubmit={handleSubmit}
                  autoComplete="off"
                >
                  <MyTextInput name="name" placeholder="Name" />

                  <MyTextArea
                    rows={3}
                    placeholder="Description"
                    name="description"
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
          </span>
        </div>
      ) : (
        <div>
          <span>{profile.bio}</span>
        </div>
      )}
    </Segment>
  );
});
