import api from "@/api/api"

const uploadImage = async (image) => {
  const formData = new FormData()
  formData.append("files", image)
  try {
    const response = await api.post(`/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response
  } catch (err) {
    return err
  }
}
export default uploadImage
