const PrivacyPolicy = () => {
  return (
    <div className="mx-auto mt-10 max-w-3xl rounded-lg bg-white p-8 shadow-md dark:bg-dark-background-secondary">
      <h1 className="mb-4 text-2xl font-bold">Privacy Policy</h1>
      <p className="mb-4">Effective Aug 8, 2023</p>

      <h2 className="mb-3 text-xl font-semibold">
        What Information HRC Collects and Why
      </h2>
      <p className="mb-4">
        In order to offer you a comprehensive experience on HRC, we gather
        information from your activities on our platform. This includes browser
        type, referring site, and date/time of each request. IP addresses are
        also gathered to enhance our services, combat spam, and produce
        aggregate data.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Information Disclosure</h2>
      <p className="mb-4">
        We never share, sell, rent, or trade User Personal Information with
        third parties for commercial reasons. However, we might share
        non-personal aggregated data such as popular HR skills.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Advertisement Details</h2>
      <p className="mb-4">
        Advertisements are targeted based on the specific page where the ad is
        displayed. They may appear in sidebars, under articles, or on search
        result pages. Registered members can disable most ads in settings.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Third Party Vendors</h2>
      <p className="mb-4">
        Account details may be shared with third parties with your consent, with
        partners meeting our data protection criteria, for aggregated research,
        by law, or if we believe it can prevent harm.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Data Storage</h2>
      <p className="mb-4">
        HRC uses third-party vendors for tech services. Engaging with HRC
        authorizes us to use your data globally.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Site Monitoring</h2>
      <p className="mb-4">
        HRC uses third-party services for platform optimization. Data like IP
        addresses may be shared with these services.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Payment Processing</h2>
      <p className="mb-4">
        {
          "We don't process payments directly but rely on third parties like Stripe and PayPal."
        }
      </p>

      <h2 className="mb-3 text-xl font-semibold">Third-Party Embeds</h2>
      <p className="mb-4">
        Content from other sources might be embedded on HRC. These are governed
        by their respective privacy policies.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Tracking & Cookies</h2>
      <p className="mb-4">
        We use cookies to recognize returning users. Google Analytics helps
        gather site usage data.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Data Security</h2>
      <p className="mb-4">
        We employ encryption for data security. However, perfect online security
        is unattainable. Ensure your account is secure.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Emails from HRC</h2>
      <p className="mb-4">
        You may receive emails about your account or updates. Interaction with
        these emails might be tracked.
      </p>

      <h2 className="mb-3 text-xl font-semibold">
        Non-administrative Emails from HRC
      </h2>
      <p className="mb-4">
        New members receive the HRC Newsletter and other non-administrative
        emails. Opt out in settings.
      </p>

      <h2 className="mb-3 text-xl font-semibold">
        Deleting Your Personal Information
      </h2>
      <p className="mb-4">
        Email us at [provide email] to delete your data and account.
      </p>

      <h2 className="mb-3 text-xl font-semibold">Data Portability</h2>
      <p className="mb-4">
        Request a copy of your user data by emailing us at [provide email].
      </p>

      <h2 className="mb-3 text-xl font-semibold">Business Transfers</h2>
      <p className="mb-4">
        {
          "If there's any business transfer affecting your data, you will be notified."
        }
      </p>

      <h2 className="mb-3 text-xl font-semibold">Changes to this Policy</h2>
      <p className="mb-4">
        {
          "We might update this Privacy Policy in the future. We'll keep you posted and update the “Effective Date.” "
        }
      </p>
    </div>
  )
}

export default PrivacyPolicy
