import { Montserrat } from 'next/font/google'
const montserrat = Montserrat({ subsets: ['latin'] })

const CodeOfConduct = () => {
  return (
    <div
      className={`${montserrat.className} mx-auto mt-10 max-w-5xl rounded-lg bg-white p-16 text-left shadow-md  dark:bg-dark-background-secondary`}
    >
      <h1 className="mb-4 text-4xl font-medium">Code of Conduct </h1>
      <p className="mb-4 text-sm">Last updated Aug 8, 2023</p>

      <h2 className="mb-3 text-xl font-medium">1. Clarity and Definitions</h2>
      <p className="mb-4 font-light">
        {"It's essential that all the terms used in the CoC are clear... "}
        <a href="#link-to-glossary">See glossary</a>
      </p>

      <h2 className="mb-3 text-xl font-medium">2. Feedback Mechanism</h2>
      <p className="mb-4 font-light">
        You might want to consider setting up a feedback mechanism...
      </p>

      <h2 className="mb-3 text-xl font-medium">3. Review Period</h2>
      <p className="mb-4 font-light">
        You could establish a regular review period for the CoC...
      </p>

      <h2 className="mb-3 text-xl font-medium">4. Enforcement Details</h2>
      <p className="mb-4 font-light">
        While you mention that violations can result...
      </p>

      <h2 className="mb-3 text-xl font-medium">5. Training</h2>
      <p className="mb-4 font-light">
        Consider offering training or workshops for community members...
      </p>

      <h2 className="mb-3 text-xl font-medium">
        6. Transparency in Enforcement
      </h2>
      <p className="mb-4 font-light">
        To build trust with the community, consider publishing anonymized
        statistics...
      </p>

      <h2 className="mb-3 text-xl font-medium">7. Accessibility</h2>
      <p className="mb-4 font-light">
        Ensure that the CoC, the abuse report form, and other relevant materials
        are easily accessible...
      </p>

      <h2 className="mb-3 text-xl font-medium">8. Anonymous Reporting</h2>
      <p className="mb-4 font-light">
        Consider offering an anonymous reporting option...
      </p>

      <h2 className="mb-3 text-xl font-medium">9. Resource Section</h2>
      <p className="mb-4 font-light">
        It could be beneficial to include a section with resources...
      </p>

      <h2 className="mb-3 text-xl font-medium">10. Context</h2>
      <p className="mb-4 font-light">
        Consider stating explicitly that context matters...
      </p>

      <h2 className="mb-3 text-xl font-medium">11. Collaborative Approach</h2>
      <p className="mb-4 font-light">
        {
          "Emphasize that while the CoC provides guidelines, it's the responsibility of all community members..."
        }
      </p>

      <p className="mt-6">
        In general, your Code of Conduct is comprehensive and promotes a
        positive, inclusive environment...
      </p>
    </div>
  )
}

export default CodeOfConduct
