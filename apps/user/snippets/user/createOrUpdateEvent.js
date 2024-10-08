import api from '@/api/api';

const AddOrChangeEvent = async (
  id,
  profileId,
  organizationId,
  eventDetails
) => {
  if (id) {
    await api.put(`/events/${id}`, {
      start: eventDetails.start,
      end: eventDetails.end,
      title: eventDetails.title,
      editable: eventDetails.editable,
      location: eventDetails.extendedProps.location,
      description: eventDetails.extendedProps.description,
    });
  } else {
    await api.post('/events', {
      start: eventDetails.start,
      end: eventDetails.end,
      title: eventDetails.title,
      editable: eventDetails.editable,
    });
  }
};

export default AddOrChangeEvent;
