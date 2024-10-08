import { grades, organizationId, provinces } from '@/context/constants'
import getUpcomingLiveLessons from '@/snippets/gql/getUpcomingLiveLessons'

const getUpcomingLiveLessonList = async () => {
  if (grades && provinces && organizationId) {
    const currentDate = new Date()
    const endDate = new Date()
    endDate.setDate(currentDate.getDate() + 6)

    let result = await getUpcomingLiveLessons({
      organizationId,
      grades,
      provinces,
      currentDate,
      endDate,
    })
    return result.lessons
  }
  return null
}
export default getUpcomingLiveLessonList
