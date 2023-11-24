import { screen, render, fireEvent, waitFor } from '@testing-library/react'

import SignUpForm from '@/components/Signup/SignupForm'
import '@testing-library/jest-dom'

describe('Sign up Form', () => {
  const formValues = {
    name: '',
    username: '',
    email: '',
    password: '',
  }
  const handleInputChange = jest.fn()
  const errors = {}
  const handleSignupSubmit = jest.fn()

  beforeEach(() => {
    render(
      <SignUpForm
        formValues={formValues}
        handleInputChange={handleInputChange}
        errors={errors}
        handleSignupSubmit={handleSignupSubmit}
      />,
    )
  })

  it('renders 4 inputs and a button', () => {
    const inputs = screen.getAllByRole('textbox')
    const button = screen.getByRole('button')

    expect(inputs).toHaveLength(4)
    expect(button).toBeInTheDocument()
  })

  it('label prop is passed to inputs', () => {
    const nameInput = screen.getByLabelText('Name')
    const usernameInput = screen.getByLabelText('Username')
    const emailInput = screen.getByLabelText('Email')
    const passwordInput = screen.getByLabelText('Password')

    expect(nameInput).toBeInTheDocument()
    expect(usernameInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })
})
