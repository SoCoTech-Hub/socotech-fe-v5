import api from '@/api/api'
import { domain } from '@/context/constants'
import Cookies from 'js-cookie'

const updateUserC = async ({ profileId, schools, grades, provinces }) => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const res = await api.put(`/profiles/${profileId}`, {
      schools,
      grades,
      provinces,
    })
    const profile = res.data
    var neededAttributes = {
      domain: domain,
      secure: true,
    }
    var newAttributes = {
      domain: domain,
      secure: true,
      expires: 1,
    }

    Cookies.remove('Provinces', neededAttributes)
    Cookies.set(
      'Provinces',
      profile?.provinces.map((province) => province.id).flat(),
      newAttributes
    )
    Cookies.remove('Schools', neededAttributes)
    Cookies.set(
      'Schools',
      profile?.schools.map((school) => school.id).flat(),
      newAttributes
    )
    Cookies.remove('Grades', neededAttributes)
    Cookies.set(
      'Grades',
      profile?.grades.map((grade) => grade.id).flat(),
      newAttributes
    )

    return
  } catch (err) {
    return err
  }
}

export default updateUserC
