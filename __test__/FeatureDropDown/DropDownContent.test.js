import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { channels, navigation, sidebarChannels } from "@/utils/data";
import { AppRouterContextProviderMock } from "@/utils/createMockRouter";
import configureStore from "redux-mock-store";
import DropDownContent from "@/components/shared/DropDownContent";
import "@testing-library/jest-dom";

describe("DropDownContent component", () => {
  const mockStore = configureStore();
  const initialState = {
    dropdown: { checked: true },
    channels: channels,
  };
  const dropdownStore = mockStore(initialState);
  const push = jest.fn();

  beforeEach(() => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Provider store={dropdownStore}>
          <DropDownContent />
        </Provider>
      </AppRouterContextProviderMock>
    );
  });
  // Test that the Logo component renders without crashing
  it("renders without crashing", () => { });

  it("should not have duplicate same in sidebar channels", () => {
    const codes = sidebarChannels.map((channel) => channel?.name);
    const uniqueCodes = [...new Set(codes)];
    expect(uniqueCodes.length).toBe(codes.length);
  });

  it("should not have duplicate same in navigation", () => {
    const codes = navigation.map((channel) => channel?.name);
    const uniqueCodes = [...new Set(codes)];
    expect(uniqueCodes.length).toBe(codes.length);
  });

  it("navigation should have correct length when rendering", async () => {
    expect(screen.getAllByTestId("navigation-heading")).toHaveLength(2);
    expect(screen.getAllByTestId("navigation-icon")).toHaveLength(2);
  });

  it("channels heading must exist and renders completly", async () => {
    expect(screen.getByText("Current Channels")).toBeInTheDocument();
  });

  it("setting heading must exist", async () => {
    expect(screen.getByText("Settings")).toBeInTheDocument();

    expect(screen.getByTestId("settings")).toHaveAttribute("href", "/settings");

    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
  });

  it("join a new channel heading must exist", async () => {
    expect(screen.getByText("Join a new channel")).toBeInTheDocument();

    expect(screen.getByTestId("join-new-channel-icon")).toBeInTheDocument();

    expect(screen.getByTestId("join-new-channel")).toHaveAttribute(
      "href",
      "/channels"
    );
  });
});
