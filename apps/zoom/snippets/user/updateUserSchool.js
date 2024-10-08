import api from "@/api/api"

const updateUserSchool = async ({
  profileId,
  schoolProvince,
  school,
  grade,
}) => {
  if (typeof window === "undefined") {
    return
  }
  try {
    await api.put(`/profiles/${profileId}`, {
      schools: [
        {
          id: school.id,
        },
      ],
      provinces: [{ id: schoolProvince }],
      grades: [{ id: grade.id }],
    })
    return
  } catch (err) {
    return err
  }
}

export default updateUserSchool
