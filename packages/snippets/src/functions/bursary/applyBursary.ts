import { api } from "../../api/api";
import { runQuery } from "../../graphql";
import { GET_BURSARY_RESPONSES } from "../../graphql/bursaryResponses/getBursaryResponses";

interface ApplyBursaryParams {
  profileId: string;
  bursaryId: string;
  bursaryUrl?: string;
}

export default async function applyBursary({
  profileId,
  bursaryId,
  bursaryUrl,
}: ApplyBursaryParams): Promise<void> {
  try {
    // Fetch existing bursary responses
    const { bursaryResponses } = await runQuery<{
      bursaryResponses: {
        id: string;
        bursary: { url?: string };
      }[];
    }>(GET_BURSARY_RESPONSES, { profileId, bursaryId });

    if (bursaryResponses.length > 0) {
      // Update existing bursary response
      await api.PUT(`/bursary-responses/${bursaryResponses[0].id}`, {
        applied: true,
      });

      // Open the bursary URL if available
      if (bursaryResponses[0].bursary.url) {
        window.open(bursaryResponses[0].bursary.url, "_blank");
      }
    } else {
      // Create a new bursary response
      await api.POST("/bursary-responses", {
        profile: { id: profileId },
        bursary: { id: bursaryId },
        applied: true,
      });

      // Open the provided bursary URL if available
      if (bursaryUrl) {
        window.open(bursaryUrl, "_blank");
      }
    }
  } catch (error: any) {
    console.error("Error applying for bursary:", error);
    throw error;
  }
}
