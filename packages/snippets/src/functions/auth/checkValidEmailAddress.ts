interface EmailData {
  id: string;
  uniqueId: string;
  email: string;
}

interface CheckEmailResult {
  valid: boolean;
  message: string;
  duplicateList?: string[];
  emailList?: EmailData[];
}

const checkValidEmailAddress = (
  validEmailList: EmailData[],
  emailAddress: string,
  emailList: EmailData[] = [],
  duplicateEmailIdList: string[] = [],
): CheckEmailResult => {
  const trimmedIdentifier = emailAddress.replace(/ /g, "");
  const regex = /([0-9]{9})/;

  let identifier = trimmedIdentifier;
  if (trimmedIdentifier.length === 9 && regex.test(trimmedIdentifier)) {
    identifier = `${trimmedIdentifier.substring(0, 3)} ${trimmedIdentifier.substring(
      3,
      5,
    )} ${trimmedIdentifier.substring(5)}`;
  }

  const valid = validEmailList.find(
    (item) => item.uniqueId === identifier || item.email === identifier,
  );
  const isDuplicate = duplicateEmailIdList.includes(valid?.id || "");

  if (!valid) {
    return {
      valid: false,
      message: `"${identifier}" is not a valid email or unique ID`,
    };
  }

  if (isDuplicate) {
    return {
      valid: false,
      message: `"${identifier}" has already been added`,
    };
  }

  const updatedEmailList = [...emailList, valid];
  const updatedDuplicateList = [...duplicateEmailIdList, valid.id];

  return {
    valid: true,
    message: "Email added successfully 👍",
    duplicateList: updatedDuplicateList,
    emailList: updatedEmailList,
  };
};

export default checkValidEmailAddress;
