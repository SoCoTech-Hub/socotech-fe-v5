import { api } from "../../api/api";
import { CreateCookie, DeleteCookie } from "../../cookies/crudCookie";

interface UpdateUserCParams {
  profileId: string;
  schools?: { id: string }[];
  grades?: { id: string }[];
  provinces?: { id: string }[];
}

export default async function updateUserC({
  profileId,
  schools,
  grades,
  provinces,
}: UpdateUserCParams): Promise<void> {
  // Prevent function from being run on the server
  if (typeof window === "undefined") {
    throw new Error("This function must be called in a browser environment.");
  }

  try {
    // Update the profile with schools, grades, and provinces
    const res = await api.PUT(`/profiles/${profileId}`, {
      schools,
      grades,
      provinces,
    });

    const profile = res.data;

    // Update cookies
    if (profile?.provinces) {
      DeleteCookie({ key: "Provinces" });
      CreateCookie({
        key: "Provinces",
        value: profile.provinces
          .map((province: { id: any }) => province.id)
          .join(","),
        time: "1d",
      });
    }

    if (profile?.schools) {
      DeleteCookie({ key: "Schools" });
      CreateCookie({
        key: "Schools",
        value: profile.schools
          .map((school: { id: any }) => school.id)
          .join(","),
        time: "1d",
      });
    }

    if (profile?.grades) {
      DeleteCookie({ key: "Grades" });
      CreateCookie({
        key: "Grades",
        value: profile.grades.map((grade: { id: any }) => grade.id).join(","),
        time: "1d",
      });
    }
  } catch (error: any) {
    console.error("An error occurred while updating the user profile:", error);
    throw error.response || error;
  }
}
