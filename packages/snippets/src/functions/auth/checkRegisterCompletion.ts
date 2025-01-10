interface Profile {
  [key: string]: any;
}

interface RegisterRequiredFields {
  [phase: string]: string[];
}

export const checkRegisterCompletion = ({
  profile,
}: {
  profile: Profile;
}): string => {
  // Define the required fields for each step of the registration process
  const registerRequiredFields: RegisterRequiredFields = {
    A: ["dob", "mobileNr", "gender"],
    // B: ["addresses.addressLine1", "addresses.town", "addresses.province", "addresses.contactNr"],
    C: ["provinces.id", "schools.id", "grades.id"],
    // D: ["serialNumber", "imei"],
    // E: ["kins.userRelation", "kins.firstName", "kins.lastName", "kins.mobileNr"],
  };

  const registerCompleted: Record<string, boolean> = {};

  // Iterate through required fields for each step
  for (const [registerPhase, fields] of Object.entries(
    registerRequiredFields,
  )) {
    registerCompleted[registerPhase] = fields.every((field) => {
      const keys = field.split(".");
      let value = profile;

      for (const key of keys) {
        value = value?.[key];
        if (!value) break;
      }

      return Boolean(value);
    });
  }

  // Find incomplete phases
  const notCompleted = Object.keys(registerCompleted).filter(
    (registerPhase) => !registerCompleted[registerPhase],
  );

  // Redirect to the first incomplete phase or the user page if all steps are complete
  return notCompleted.length > 0 ? `/update` : "../user";
};
