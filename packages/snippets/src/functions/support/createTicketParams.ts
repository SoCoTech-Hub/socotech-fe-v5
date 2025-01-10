import { api } from "../../api/api";
import { grades, organizationId, provinces } from "../../context/constants";

interface CreateTicketParams {
  title: string;
  description: string;
  attachments?: any | null;
  supportTopicId?: string | null;
  createdBy: string;
  path?: string;
  device?: string;
  timeSpent?: number;
  supportDepartment?: string | null;
  supportStatus?: { id: number };
  assignedTo?: string | null;
  open?: boolean;
}

export default async function createTicket({
  title,
  description,
  attachments = null,
  supportTopicId = null,
  createdBy,
  path = "",
  device = "",
  timeSpent = 0,
  supportDepartment = null,
  supportStatus = { id: 1 },
  assignedTo = null,
  open = true,
}: CreateTicketParams): Promise<any> {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const payload = {
      title,
      description,
      timeSpent,
      supportDepartment,
      supportStatus,
      assignedTo,
      createdBy: { id: createdBy },
      attachments,
      supportTopic: supportTopicId ? { id: supportTopicId } : null,
      open,
      organization: { id: organizationId },
      grade: { id: grades },
      province: { id: provinces },
      device,
      path,
    };

    return await api.POST("/support-tickets/", payload);
  } catch (error: any) {
    console.error("Error creating support ticket:", error);
    return error;
  }
}
