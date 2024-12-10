const checkValidEmailAddress = (
    validEmailList,
    emailAddress,
    emailList,
    duplicateEmailIdList = []
) => {
    let duplicateList = duplicateEmailIdList
    let message = ""
    let data = {}

    let regex = /([0-9]{9})/
    let identifier = emailAddress.replace(/ /g, "")

    if (identifier.length === 9 && regex.test(identifier)) {
      identifier = `${identifier.substring(0, 3)} ${identifier.substring(
        3,
        5
      )} ${identifier.substring(5, identifier.length)}`
    }

    let valid = validEmailList.find(
      (validEmailList) =>
        validEmailList.uniqueId === identifier ||
        validEmailList.email === identifier
    )

    let duplicateEmail = duplicateList.find((e) => e === valid?.id)

    if (!valid) {
      message = `"${identifier}" is not a valid email or unique ID`
      data = { 
        valid: false,
        message: message
      }
    } else if (duplicateEmail) {
      message = `"${identifier}" has already been added `
      data = { 
        valid: false,
        message: message
      }
    } else {
        let validList = []
      if (emailList) {
        validList = [...emailList, valid]
      } else {
        validList = [valid]
      }
       message = "email added successfully 👍"

      duplicateList = [...duplicateList, valid.id]
      data = { 
        valid: true,
        message: message,
        duplicateList: duplicateList,
        emailList: validList
      }
    }
    return data
};

export default checkValidEmailAddress;
