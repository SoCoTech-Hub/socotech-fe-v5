import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_QUALIFICATION_RESPONSES } from "../../graphql/qualificationResponses/getQualificationResponses";

interface ApplyQualificationParams {
  profileId: string;
  qualificationId: string;
  qualificationUrl?: string;
}

export default async function applyQualification({
  profileId,
  qualificationId,
  qualificationUrl,
}: ApplyQualificationParams): Promise<void> {
  try {
    // Fetch existing qualification responses
    const { qualificationResponses } = await runQuery<{
      qualificationResponses: {
        id: string;
        qualification: { url?: string };
      }[];
    }>(GET_QUALIFICATION_RESPONSES, { profileId, qualificationId });

    if (qualificationResponses.length > 0) {
      // Update existing qualification response
      await api.PUT(
        `/qualification-responses/${qualificationResponses[0].id}`,
        {
          applied: true,
        },
      );

      // Open the qualification URL if available
      if (qualificationResponses[0].qualification.url) {
        window.open(qualificationResponses[0].qualification.url, "_blank");
      }
    } else {
      // Create a new qualification response
      await api.POST("/qualification-responses", {
        profile: { id: profileId },
        qualification: { id: qualificationId },
        applied: true,
      });

      // Open the provided qualification URL if available
      if (qualificationUrl) {
        window.open(qualificationUrl, "_blank");
      }
    }
  } catch (error: any) {
    console.error("Error applying for qualification:", error);
    throw error;
  }
}
