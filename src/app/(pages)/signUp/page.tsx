import SignUpRoute from '@/components/SignUpRoute'
// import { cookies } from 'next/headers'
// import { redirect } from 'next/navigation'

const SignRoutePage = () => {
  // const userDetailsCookies = cookies().get('user-details')

  // if (userDetailsCookies) {
  // redirect('/feeds')
  // } else {
  return <SignUpRoute />
  // }
}

export default SignRoutePage
