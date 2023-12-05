import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

const TermsOfUse = () => {
  return (
    <div className={`${montserrat.className} mx-auto text-left mt-10 max-w-5xl rounded-lg bg-white p-16 shadow-md dark:bg-dark-background-secondary`}>
      <h2 className="mb-4 text-4xl font-medium">Terms of Use</h2>
      <p className="mb-6 text-gray-600 font-light dark:text-white">
        Welcome to our website. If you continue to browse and use this website,
        you are agreeing to comply with and be bound by the following terms and
        conditions of use, which together with our privacy policy govern our
        relationship with you in relation to this website.
      </p>

      <h3 className="mb-4 text-xl font-medium">
        1. The use of this website is subject to the following terms:
      </h3>
      <ul className="list-disc pl-5 text-gray-600 font-light dark:text-white">
        <li className="mb-2">
          The content of the pages of this website is for your general
          information and use only. It is subject to change without notice.
        </li>
        <li className="mb-2">
          Neither we nor any third parties provide any warranty or guarantee as
          to the accuracy, timeliness, performance, completeness, or suitability
          of the information and materials found or offered on this website for
          any particular purpose.
        </li>
        <li className="mb-2">
          Your use of any information or materials on this website is entirely
          at your own risk, for which we shall not be liable.
        </li>
        <li className="mb-2">
          It shall be your own responsibility to ensure that any products,
          services, or information available through this website meet your
          specific requirements.
        </li>
      </ul>

      {/* You can continue adding more terms and conditions as needed */}
    </div>
  )
}

export default TermsOfUse
