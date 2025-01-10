import countBursaryResponses from "./countBursaryResponses";
import { runQuery } from "../../graphql";
import { GET_BURSARY_DETAILS } from "../../graphql/bursary/getBursaryDetails";

interface SaveBursaryParams {
  bursaryId?: string;
  selectedId?: string;
}

interface SaveBursaryResult {
  selected: Record<string, any>;
  numberOfApplicants: number;
}

export const saveBursary = async ({
  bursaryId,
  selectedId,
}: SaveBursaryParams): Promise<SaveBursaryResult> => {
  try {
    const id = selectedId || bursaryId;
    if (!id) {
      throw new Error("No bursaryId or selectedId provided.");
    }

    // Fetch bursary details
    const { bursary } = await runQuery<{
      bursary: Record<string, any>;
    }>(GET_BURSARY_DETAILS, { id });

    // Count applicants
    const numberOfApplicants = await countBursaryResponses(id);

    return {
      selected: bursary || {},
      numberOfApplicants: numberOfApplicants?.bursaryResponses || 0,
    };
  } catch (error: any) {
    console.error("Error saving bursary:", error);
    throw error;
  }
};

export default saveBursary;
