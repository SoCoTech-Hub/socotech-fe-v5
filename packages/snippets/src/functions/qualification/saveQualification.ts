import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_QUALIFICATION_RESPONSE } from "../../graphql/qualifications/getQualificationResponse";

interface SaveQualificationParams {
  profileId: string;
  qualificationId: string;
}

const saveQualification = async ({
  profileId,
  qualificationId,
}: SaveQualificationParams): Promise<void> => {
  try {
    // Fetch existing qualification response
    const { qualificationResponses } = await runQuery<{
      qualificationResponses: { id: string }[];
    }>(GET_QUALIFICATION_RESPONSE, {
      where: {
        profile: { id: profileId },
        qualification: { id: qualificationId },
      },
    });

    if (qualificationResponses.length > 0) {
      // Update existing qualification response
      await api.PUT(
        `/qualification-responses/${qualificationResponses[0].id}`,
        {
          isSaved: true,
        },
      );
    } else {
      // Create a new qualification response
      await api.POST("/qualification-responses", {
        profile: { id: profileId },
        qualification: { id: qualificationId },
        isSaved: true,
      });
    }
  } catch (error: any) {
    console.error("Error saving qualification:", error);
    throw error;
  }
};

export default saveQualification;
