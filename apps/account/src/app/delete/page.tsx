import {
  DeactivateProfile,
  DeleteProfile,
} from "@acme/snippets/functions/account/profile";
import DeleteAccount from "@acme/ui/deletePage";

const DeletePage = () => {
  return (
    <DeleteAccount
      deleteAccount={DeleteProfile}
      deactivateAccount={DeactivateProfile}
    />
  );
};
export default DeletePage;
