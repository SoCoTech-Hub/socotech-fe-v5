import UploadForum from "@/components/Forum/UploadForum";
import { orgName } from "@/context/constants";

//TODO: Create forum here
function Create() {
  const seo = {
    title: `${orgName} - Forum: Create a Topic`,
    description:
      "Join the conversation and make it a positive space for everyone",
  };
  return <UploadForum />;
}
export default Create;
