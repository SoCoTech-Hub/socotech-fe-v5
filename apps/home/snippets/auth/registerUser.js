import publicapi from '@/api/publicapi'
import { domain } from '@/context/constants'
import Cookies from 'js-cookie'
import generateUniqueId from '@/snippets/auth/generateUniqueId'

const registerUser = async ({
  first_name,
  last_name,
  email,
  password,
  // voucher,
  organization,
}) => {
  //prevent function from being ran on the server
  if (typeof window === 'undefined') {
    return
  }

  try {
    const profile = await publicapi.post(`/profiles`, {
      firstName: first_name,
      lastName: last_name,
      // voucher: { id: voucher.id },
      organization: { id: organization },
    })
  
    const res = await publicapi.post(`/auth/local/register`, {
      username: email,
      email: email,
      password: password,
      profile: { id: profile.data.id },
      blocked: false,
    })
    if (!res.ok) {
   
      return res
    }
    const data = res.data


    const uniqueId = generateUniqueId({
      organization: profile.data.organization,
      userid: data.user.id,
    })
    const organization = profile.data.organization
    const profilePost = await publicapi.put(
      `/profiles/${data.user.profile.id}`,
      {
        uniqueId: uniqueId,
      }
    )
    if (!profilePost.ok) {
      return profilePost
    }
    const registerEmail = await publicapi.post(`/in-mails`, {
      subject: 'Welcome message',
      body: `Hi ${first_name},
      <br/><br/>
      Welcome to ${organization.name}. We hope you're ready to start changing the way you study for the better! 
      <br/><br/> 
      To get started, you can head to the Dashboard page and take a tour of the system. You can also visit your Profile page to make sure we have all of your information.
      <br/><br/>
      If you have any questions, head over to our Support page and create a ticket. Our agents are always ready to assist you. 
      <br/><br/>
      We hope you enjoy your experience on ${organization.name}.
      <br/><br/>
      All the best with your studies,
      <br/><br/>
      The ${organization.name} Team
      `,
      draft: false,
      reply: false,
      from: { id: data.user.profile.id },
      to: { id: data.user.profile.id },
    })
    if (!registerEmail.ok) {
      return registerEmail
    }

    // const profile = profileUpdate.data
    Cookies.remove('email', {
      domain: domain,
      secure: true,
      expires: 180,
    })
    Cookies.set('email', data.user.email, {
      expires: 180,
      domain: domain,
      secure: true,
    })
    Cookies.remove('rememberMe', {
      domain: domain,
      secure: true,
      expires: 180,
    })
    Cookies.set('rememberMe', JSON.parse(false), {
      expires: 180,
      domain: domain,
      secure: true,
    })
    return profilePost
  } catch (error) {
    return error.response || error
  }
}
export default registerUser
