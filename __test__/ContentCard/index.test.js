import { render, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import ContentCard from '@/components/ContentCard';
import '@testing-library/jest-dom';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

const mockSession = {
  data: {
    currentUser: {
      id: 1,
      username: 'testuser',
    },
  },
};

describe('ContentCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSession.mockReturnValue(mockSession);
    useParams.mockReturnValue({});
    render(<ContentCard postId={1} />);
  });

  it('renders without crashing', () => {});

  it('renders post correctly', () => {
    expect(screen.getByLabelText('post-title')).toBeInTheDocument();
  });

  it('renders all  buttons', () => {
    expect(screen.getByText('Back to community')).toBeInTheDocument();
    expect(screen.getByText('Mute')).toBeInTheDocument();
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Report')).toBeInTheDocument();
    expect(screen.getByText('Diversity and Inclusion')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Post Comment' })
    ).toBeInTheDocument();
  });
});
