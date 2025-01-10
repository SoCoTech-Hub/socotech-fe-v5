import { api } from "../../api/api";
import { profileId } from "../../context/constants";
import { CreateAllCookies } from "../../cookies/createAllCookies";

interface UpdateUserSchoolParams {
  schoolProvince: { id?: string } | string;
  schoolObj: { id?: string } | string;
  grade: { id?: string } | string;
}

const updateUserSchool = async ({
  schoolProvince,
  schoolObj,
  grade,
}: UpdateUserSchoolParams): Promise<void> => {
  if (typeof window === "undefined") {
    console.warn("This function cannot be executed on the server.");
    return;
  }

  try {
    // Prepare data for the API request
    const requestBody = {
      schools: [
        {
          id:
            typeof schoolObj === "object" && schoolObj.id
              ? schoolObj.id
              : schoolObj,
        },
      ],
      provinces: [
        {
          id:
            typeof schoolProvince === "object" && schoolProvince.id
              ? schoolProvince.id
              : schoolProvince,
        },
      ],
      grades: [
        {
          id: typeof grade === "object" && grade.id ? grade.id : grade,
        },
      ],
    };

    // Update user profile with school, province, and grade information
    const res = await api.PUT(`/profiles/${profileId}`, requestBody);

    // Update cookies with the updated data
    CreateAllCookies({
      grades: res.data.grades[0].id,
      provinces: res.data.provinces[0].id,
      schools: res.data.schools[0].id,
      days: 14,
    });

    console.log("User school information updated successfully.");
  } catch (error: any) {
    console.error("Error updating user school information:", error);
    throw error;
  }
};

export default updateUserSchool;
