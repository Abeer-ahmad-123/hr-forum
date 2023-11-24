import Card from "@/components/Card";
import configureStore from "redux-mock-store";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppRouterContextProviderMock } from "@/utils/createMockRouter";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { mockChannelkeyValuePair } from "@/utils/data";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

const mockSession = {
  data: {
    currentUser: {
      id: 1,
      username: "testuser",
    },
  },
};
describe("Card component", () => {
  const mockStore = configureStore();
  const darkModeInitialState = {
    colorMode: { darkMode: true },
    channels: { channelsKeyValuePair: mockChannelkeyValuePair },
  };

  // Create stores
  const darkModeStore = mockStore(darkModeInitialState);

  const push = jest.fn();
  const id = 1;
  const title = "Handling Workplace Conflict";
  const content =
    "What are some effective strategies for handling workplace conflicts? How can HR managers mediate disputes between employees?";
  const user = {
    image: {
      png: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
      webp: "https://example.com/images/avatars/image-johnsmith.webp",
    },
    username: "johnsmithHR",
  };
  const channelName = "HR Best Practices";
  const likes = 25;

  beforeEach(() => {
    jest.clearAllMocks();
    useSession.mockReturnValue(mockSession);
    useParams.mockReturnValue({});
    render(
      <AppRouterContextProviderMock router={push}>
        <Provider store={darkModeStore}>
          <Card
            id={id}
            title={title}
            content={content}
            channelName={channelName}
            user={user}
            likes={likes}
          />
        </Provider>
      </AppRouterContextProviderMock>
    );
  });
  it("renders without crashing", () => {});
  it("render title correctly", () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it("renders user info correctly", () => {
    expect(screen.getByLabelText("user-name")).toBeInTheDocument();
    expect(screen.getByAltText("user-picture")).toBeInTheDocument();
  });
  it("renders channel name correctly", () => {
    expect(screen.getAllByLabelText("channel-name")).toHaveLength(1);
  });
  it("renders content  correctly", () => {
    expect(screen.getByLabelText("content")).toBeInTheDocument();
  });
  it("should open modal when card is clicked", async () => {
    // Simulate a click event on the card
    await userEvent.click(screen.getByText(title));

    // Assert that the modal is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});
