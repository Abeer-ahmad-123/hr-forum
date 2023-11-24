import Bookmark from "@/components/Bookmark";
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Bookmark component", () => {
  const user = userEvent.setup();
  it("renders without crashing", () => {
    render(<Bookmark />);
  });

  it("toggles bookmark icon when clicked", async () => {
    render(<Bookmark />);

    const bookmarkButton = screen.getByRole("button");
    expect(bookmarkButton).toBeInTheDocument();

    expect(screen.getByTestId("second-icon")).toBeInTheDocument();

    await user.click(bookmarkButton);

    expect(screen.getByTestId("first-icon")).toBeInTheDocument();
  });

  it("applies hover effect on button", async () => {
    render(<Bookmark />);

    const bookmarkButton = screen.getByRole("button");

    await user.hover(bookmarkButton);

    expect(bookmarkButton.classList).toContain("hover:scale-110");
  });
});
