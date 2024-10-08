import api from "@/api/api"

const removeAttachment = async ({ fileId }) => {
  try {
    const response = await api.delete(`/upload/files/${fileId}`)
    return response
  } catch (e) {
    console.error(e)
  }
}

export default removeAttachment
