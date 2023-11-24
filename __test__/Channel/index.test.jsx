import Channel from '@/components/Channel/Channel'
import { render, screen } from '@testing-library/react'
import { channels } from '@/utils/data'
import '@testing-library/jest-dom'

describe('Channel', () => {
  it('renders without crashing', () => {
    render(<Channel />)
  })
  // Test that the 'Channel' component renders the list of channels with their names, pictures, descriptions, and toggle buttons correctly.
  it('should render the list of channels with their names, pictures, descriptions, and toggle buttons correctly', () => {
    render(<Channel />)

    channels.forEach((channel) => {
      const nameElement = screen.getByText(channel.name)
      const pictureElement = screen.getByAltText(channel.name)
      const descriptionElement = screen.getByText(channel.description)

      expect(nameElement).toBeInTheDocument()
      expect(pictureElement).toBeInTheDocument()
      expect(descriptionElement).toBeInTheDocument()
    })

    // Check if toggle buttons are rendered for each channel
    const toggleButtons = screen.getAllByRole('checkbox')
    expect(toggleButtons).toHaveLength(channels.length)
  })
})
