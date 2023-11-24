import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoggedIn from '@/components/Navbar/LoggedIn'
import configureStore from 'redux-mock-store'
import { useSession } from 'next-auth/react'
import '@testing-library/jest-dom'
import { Provider } from 'react-redux'
import { AppRouterContextProviderMock } from '@/utils/createMockRouter'
import { channels } from '@/utils/data'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

describe('Logged in component', () => {
  const mockStore = configureStore()
  const darkModeInitialState = {
    colorMode: { darkMode: true },
    channels: { channels: channels },
  }

  // Create stores
  const darkModeStore = mockStore(darkModeInitialState)

  const push = jest.fn()

  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={push}>
        <Provider store={darkModeStore}>
          <LoggedIn />
        </Provider>
      </AppRouterContextProviderMock>,
    )
  })
  it('renders without crashing', () => {})
  it('renders user info', () => {
    expect(screen.getByTestId('user-name')).toBeInTheDocument()
    expect(screen.getByTestId('user-email')).toBeInTheDocument()
    expect(screen.getByAltText('user-picture')).toBeInTheDocument()

    const link = screen.getAllByRole('link')
    expect(link).toHaveLength(13)
  })
})
