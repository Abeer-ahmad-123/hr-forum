import { PrivacyPolicy } from '@/components/Policies'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HR-Forum - Privacy Policy',
}

const PrivacyPolicyPage = () => {
  return <PrivacyPolicy />
}

export default PrivacyPolicyPage
