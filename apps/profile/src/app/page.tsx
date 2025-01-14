import React from "react";

import { UpdateImages, UploadImages } from "@acme/snippets"; //TODO: not sure if correct
import {
  Banner,
  profileId,
  ProfilePic,
  userId,
  userName,
} from "@acme/snippets/context/constants";
import { Section } from "@acme/ui/profile/section";
import { Cover } from "@acme/ui/support/cover";

export default function Home() {
  return (
    <div>
      <div className="col row">
        <div className="mobile:gy-0 mobile:space-y-0">
          <div className="mobile:hidden">
            <Cover
              user={{ id: userId, profile: { id: profileId } }}
              avatarImage={ProfilePic}
              bannerImage={Banner}
              name={userName}
              updateImages={UpdateImages}
              uploadImage={UploadImages}
            />
          </div>

          <div className="">
            <Section />
          </div>
        </div>
      </div>
    </div>
  );
}
