import { render, screen } from '@testing-library/react';
import ChannelPill from '@/components/Generic/ChannelPill';
import '@testing-library/jest-dom';

describe('ChannelPill', () => {
  const mockChannelName = 'Mock Channel';

  it('render correctly', () => {
    render(
      <ChannelPill
        name={mockChannelName}
        bgColor={'bg-accent'}
        textColor={'text-white'}
      />
    );

    const span = screen.getByText(mockChannelName);

    expect(span).toBeInTheDocument();
  });
});
