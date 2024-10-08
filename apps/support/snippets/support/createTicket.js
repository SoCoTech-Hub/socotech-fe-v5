import api from '@/api/api'
import { grades, organizationId, provinces } from '@/context/constants'

const createTicket = async ({
  title,
  description,
  attachments = null,
  supportTopicId = null,
  createdBy,
  path = '',
  device = '',
  timeSpent = 0,
  supportDepartment = null,
  supportStatus = { id: 1 },
  assignedTo = null,
  open = true,
}) => {
  if (typeof window === 'undefined') {   
    return
  }
const response = await api.post('/support-tickets/', {
    title: title,
    description: description,
    timeSpent: timeSpent,
    supportDepartment: supportDepartment,
    supportStatus: supportStatus,
    assignedTo: assignedTo,
    createdBy: { id: createdBy },
    attachments: attachments,
    supportTopic: { id: supportTopicId },
    open: open,
    organization: { id: organizationId },
    grade: { id: grades[0] },
    province: { id: provinces[0] },
    device: device,
    path: path,
   })

  return response
}

export default createTicket
