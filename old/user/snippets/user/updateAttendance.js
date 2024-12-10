import api from '@/api/api';
import getGQLRequest from '../getGQLRequest';
import { organizationId, profileId } from '@/context/constants';

const ChangeAttendance = async (id, attendance, start, end) => {
  const { data } = await getGQLRequest({
    endpoint: 'eventResponses',
    fields: 'id',
    // where: `event:{id:${id}},_or:[{event:{teacher:{id:${profileId}}}},{event:{students:{id:${profileId}}}},{event:{author:{id:${profileId}}}}],event:{organization:{id:${organizationId}}},profile:{id:${profileId}}`,
    where: `_and: [{event: {id: ${id}}},{event:organization:{id:${organizationId}}}], _or: [{event: {teacher: {id: ${profileId}}}},{event: {students: {id: ${profileId}}}}, {event: {author: {id: ${profileId}}}}], profile: {id: ${profileId}}`,
  });

  if (data?.id) {
    await api.put(`/event-responses/${data.id}`, {
      profile: profileId,
      attending: attendance,
      start: start,
      end: end,
    });
  } else {
    await api.post('/event-responses', {
      profile: profileId,
      attending: attendance,
      event: id,
      start: start,
      end: end,
    });
  }
  return;
};

export default ChangeAttendance;
