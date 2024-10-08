import api from '@/api/api';
import getGQLRequest from '../getGQLRequest';

const RemoveEvent = async ({ id, organizationId }) => {
  const { data } = await getGQLRequest({
    endpoint: 'events',
    fields: 'id',
    where: `editable:true,id:${id},organization:{id:${organizationId}}`,
  });

  if (data) {
    await api.delete(`/events/${id}`);
  }
};

export default RemoveEvent;
