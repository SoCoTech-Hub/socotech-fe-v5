import api from '@/api/api';

const AddPersonalEvent = async ({
  id,
  start,
  end,
  title,
  description,
  image,
  location,
  authorId,
  profileId,
  orgId,
  teacher,
  province,
  school,
  grade,
}) => {
  const data = {
    ...(start && { start: start }),
    ...(end && { end: end }),
    ...(title && { title: title }),
    private: true,
    editable: true,
    ...(description && { desciption: description }),
    ...(image && { image: image }),
    ...(location && { location: location }),
    ...(!id & orgId && { organization: { id: orgId } }),
    ...(teacher && { teacher: { id: teacher } }),
    ...(!id & province && { province: { id: province } }),
    ...(!id & school && { school: { id: school } }),
    ...(!id & grade && { grade: { id: grade } }),
    ...(profileId && { students: { id: profileId } }),
    ...(authorId && { author: { id: authorId } }),
    ...(teacher && { isLive: true }),
  };
  if (id) {
    await api.put(`/events/${id}`, data);
  } else {
    await api.post('/events', data);
  }
};

export default AddPersonalEvent;
