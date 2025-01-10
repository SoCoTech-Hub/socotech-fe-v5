import countQualificationResponses from "./countQualificationResponses";
import { runQuery } from "../../graphql";
import { GET_QUALIFICATION_DETAILS } from "../../graphql/qualifications/getQualificationDetails";

interface SaveQualificationParams {
  qualificationId?: string;
  selectedId?: string;
}

interface SaveQualificationResult {
  selected: Record<string, any>;
  numberOfApplicants: number;
}

export const saveQualification = async ({
  qualificationId,
  selectedId,
}: SaveQualificationParams): Promise<SaveQualificationResult> => {
  try {
    const id = selectedId || qualificationId;
    if (!id) {
      throw new Error("No qualificationId or selectedId provided.");
    }

    // Fetch qualification details
    const { qualification } = await runQuery<{
      qualification: Record<string, any>;
    }>(GET_QUALIFICATION_DETAILS, { id });

    // Count applicants
    const numberOfApplicants = await countQualificationResponses(id);

    return {
      selected: qualification || {},
      numberOfApplicants: numberOfApplicants?.qualificationResponses || 0,
    };
  } catch (error: any) {
    console.error("Error saving qualification:", error);
    throw error;
  }
};

export default saveQualification;
