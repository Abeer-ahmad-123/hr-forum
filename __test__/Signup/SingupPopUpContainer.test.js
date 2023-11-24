import { screen, render } from '@testing-library/react'
import SignupPopUpContainer from '@/components/Signup/SignupPopUpContainer'
import '@testing-library/jest-dom'

describe('Sign up Popup Container', () => {
  const formValues = {
    name: '',
    username: '',
    email: '',
    password: '',
  }
  const handleInputChange = jest.fn()
  const errors = {}
  const handleSignupSubmit = jest.fn()
  const handleLoginClick = jest.fn()

  beforeEach(() => {
    render(
      <SignupPopUpContainer
        formValues={formValues}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSignupSubmit={handleSignupSubmit}
        handleLoginClick={handleLoginClick}
      />,
    )
  })
  it('renders heading correctly', () => {
    const signupHeading = screen.getByRole('heading')

    expect(signupHeading).toBeInTheDocument()
    expect(signupHeading).toHaveTextContent('Sign Up')
  })

  it('renders google button correctly', () => {
    const buttonTitle = 'Sign Up with Google'
    const imageSrc =
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'

    const button = screen.getByText(buttonTitle)

    expect(button).toBeInTheDocument()

    const image = screen.getByAltText('Google G Logo')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', imageSrc)
  })

  it('renders sign up form correctly', () => {
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button', { name: 'Sign Up' })

    expect(inputs).toHaveLength(4)
    expect(button).toBeInTheDocument()
  })
})
