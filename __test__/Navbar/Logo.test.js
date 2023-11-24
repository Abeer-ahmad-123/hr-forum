import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import Logo from '@/components/Navbar/Logo'
import '@testing-library/jest-dom'

const mockStore = configureStore()
const darkModeInitialState = {
  colorMode: { darkMode: true },
}

const lightModeInitialState = {
  colorMode: { darkMode: false },
}

// Create stores
const darkModeStore = mockStore(darkModeInitialState)
const lightModeStore = mockStore(lightModeInitialState)

const renderWithStore = (store, props = {}) => {
  const AllTheProviders = ({ children }) => {
    return <Provider store={store}>{children}</Provider>
  }
  return render(<Logo {...props} />, { wrapper: AllTheProviders })
}

describe('Logo component', () => {
  // Test that the Logo component renders without crashing
  it('renders without crashing', () => {
    renderWithStore(darkModeStore)
  })

  // Test that the Logo component displays the text "HR FORUM"
  it('should display "HR FORUM" text', () => {
    renderWithStore(darkModeStore)
    expect(screen.getByText('HR FORUM'))
  })

  // Test that the Logo component displays the GiCheckedShield icon
  it('should display the GiCheckedShield icon', () => {
    renderWithStore(darkModeStore)

    expect(screen.getByTestId('logo-icon'))
  })

  // Test that the GiCheckedShield icon is filled with the correct color based on the darkMode state
  it('should fill the GiCheckedShield icon with the correct color based on darkMode state', () => {
    renderWithStore(darkModeStore)

    const iconElement = screen.getByTestId('logo-icon')
    expect(iconElement).toBeInTheDocument()
    expect(iconElement).toHaveClass('inline-block h-7 w-8 align-middle')
    expect(iconElement).toHaveAttribute('fill', '#f5f5f5')
  })

  // Test that the Logo component renders correctly when the darkMode state is false.
  it('should render correctly when darkMode is false', () => {
    renderWithStore(darkModeStore)

    const iconElement = screen.getByTestId('logo-icon')

    expect(screen.getByText('HR FORUM')).toBeInTheDocument()
    expect(iconElement).toHaveAttribute('fill', '#f5f5f5')
  })

  // Test that the Logo component renders with the correct fill color when darkMode state is true.
  it('should render with correct fill color when darkMode state is true', () => {
    renderWithStore(lightModeStore)

    const iconElement = screen.getByTestId('logo-icon')
    expect(iconElement).toHaveAttribute('fill', '#5141df')
  })

  // Test that the Link component in the Logo function has an undefined href prop.
  it('should have /feed href prop for Link component', () => {
    renderWithStore(darkModeStore)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/feed')
  })
})
