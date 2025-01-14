import React from "react";

import {UploadForum} from "@acme/ui";

//TODO: Create forum here
function Create() {
  const userId = 123; //TODO:Replace with actual user ID logic
  const isAdmin = true; //TODO:Replace with actual admin check logic

  return <UploadForum userId={userId} isAdmin={isAdmin} />;
}

export default Create;
