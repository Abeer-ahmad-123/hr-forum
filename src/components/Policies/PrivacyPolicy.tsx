import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

const PrivacyPolicy = () => {
  return (
    <div
      className={`${montserrat.className} mx-auto mt-10 max-w-5xl rounded-lg bg-white p-16 text-left shadow-md dark:bg-dark-background-secondary`}
    >
      <h1 className="mb-4 text-4xl font-medium"> Privacy Policy</h1>
      <p className="mb-4 text-sm">Effective Aug 8, 2023</p>

      <h2 className="mb-3 text-xl font-medium">
        1. What Information HRC Collects and Why
      </h2>
      <p className="mb-4 font-light">
        In order to offer you a comprehensive experience on HRC, we gather
        information from your activities on our platform. This includes browser
        type, referring site, and date/time of each request. IP addresses are
        also gathered to enhance our services, combat spam, and produce
        aggregate data.
      </p>

      <h2 className="mb-3 text-xl font-medium">2. Information Disclosure</h2>
      <p className="mb-4 font-light">
        We never share, sell, rent, or trade User Personal Information with
        third parties for commercial reasons. However, we might share
        non-personal aggregated data such as popular HR skills.
      </p>

      <h2 className="mb-3 text-xl font-medium">3. Advertisement Details</h2>
      <p className="mb-4 font-light">
        Advertisements are targeted based on the specific page where the ad is
        displayed. They may appear in sidebars, under articles, or on search
        result pages. Registered members can disable most ads in settings.
      </p>

      <h2 className="mb-3 text-xl font-medium">4. Third Party Vendors</h2>
      <p className="mb-4 font-light">
        Account details may be shared with third parties with your consent, with
        partners meeting our data protection criteria, for aggregated research,
        by law, or if we believe it can prevent harm.
      </p>

      <h2 className="mb-3 text-xl font-medium">5. Data Storage</h2>
      <p className="mb-4 font-light">
        HRC uses third-party vendors for tech services. Engaging with HRC
        authorizes us to use your data globally.
      </p>

      <h2 className="mb-3 text-xl font-medium">6. Site Monitoring</h2>
      <p className="mb-4 font-light">
        HRC uses third-party services for platform optimization. Data like IP
        addresses may be shared with these services.
      </p>

      <h2 className="mb-3 text-xl font-medium">7. Payment Processing</h2>
      <p className="mb-4 font-light">
        {
          "We don't process payments directly but rely on third parties like Stripe and PayPal."
        }
      </p>

      <h2 className="mb-3 text-xl font-medium">8. Third-Party Embeds</h2>
      <p className="mb-4 font-light">
        Content from other sources might be embedded on HRC. These are governed
        by their respective privacy policies.
      </p>

      <h2 className="mb-3 text-xl font-medium">9. Tracking & Cookies</h2>
      <p className="mb-4 font-light">
        We use cookies to recognize returning users. Google Analytics helps
        gather site usage data.
      </p>

      <h2 className="mb-3 text-xl font-medium">10. Data Security</h2>
      <p className="mb-4 font-light">
        We employ encryption for data security. However, perfect online security
        is unattainable. Ensure your account is secure.
      </p>

      <h2 className="mb-3 text-xl font-medium">11. Emails from HRC</h2>
      <p className="mb-4 font-light">
        You may receive emails about your account or updates. Interaction with
        these emails might be tracked.
      </p>

      <h2 className="mb-3 text-xl font-medium">
        12. Non-administrative Emails from HRC
      </h2>
      <p className="mb-4 font-light">
        New members receive the HRC Newsletter and other non-administrative
        emails. Opt out in settings.
      </p>

      <h2 className="mb-3 text-xl font-medium">
        13. Deleting Your Personal Information
      </h2>
      <p className="mb-4 font-light">
        Email us at [provide email] to delete your data and account.
      </p>

      <h2 className="mb-3 text-xl font-medium">14. Data Portability</h2>
      <p className="mb-4 font-light">
        Request a copy of your user data by emailing us at [provide email].
      </p>

      <h2 className="mb-3 text-xl font-medium">15. Business Transfers</h2>
      <p className="mb-4 font-light">
        {
          "If there's any business transfer affecting your data, you will be notified."
        }
      </p>

      <h2 className="mb-3 text-xl font-medium">16. Changes to this Policy</h2>
      <p className="mb-4 font-light">
        {
          "We might update this Privacy Policy in the future. We'll keep you posted and update the “Effective Date.” "
        }
      </p>
    </div>
  )
}

export default PrivacyPolicy
