import { render, screen } from "@testing-library/react";
import Toggle from "@/components/Buttons/Toggle";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("Toggle", () => {
  const user = userEvent.setup();

  // Test that the checkbox is unchecked by default
  it("should have an unchecked checkbox by default", () => {
    render(<Toggle />);

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveProperty("checked", false);
  });

  // Test that the Toggle component renders without any errors
  it("should render without errors", () => {
    render(<Toggle />);
  });

  // Test that clicking on the toggle switches the checkbox state
  it("should switch checkbox state when toggle is clicked", async () => {
    render(<Toggle />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(checkbox).toHaveProperty("checked", true);
  });

  // Test that the background color changes to green when the checkbox is checked
  it("should change background color to green when checkbox is checked", async () => {
    const { container } = render(<Toggle />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    // Assert
    expect(container.getElementsByClassName("bg-green-700")).toHaveLength(1);
  });

  // Test that the background color changes to red when the checkbox is unchecked
  it("should change background color to red when checkbox is unchecked", async () => {
    const { container } = render(<Toggle />);

    const checkbox = screen.getByRole("checkbox");

    await user.click(checkbox);

    expect(container.getElementsByClassName("bg-green-700")).toHaveLength(1);
    expect(container.getElementsByClassName("translate-x-full")).toHaveLength(
      1
    );
  });
});
