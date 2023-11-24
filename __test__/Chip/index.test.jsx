import Chip from "@/components/Chip";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Chip", () => {
  // Renders a chip with empty children
  it("should render a chip with empty children", () => {
    // Arrange
    const children = [];
    const title = "Test Title";
    const className = "test-class";

    // Act
    const { container } = render(
      <Chip children={children} title={title} className={className} />
    );

    const itemElements = container.querySelectorAll("button");

    expect(itemElements.length).toBe(1);
  });

  it("should render a chip with dark mode", () => {
    // Arrange
    const children = [];
    const title = "Test Title";
    const className = "test-class";

    // Act
    const { container } = render(
      <Chip children={children} title={title} className={className} />
    );
    const div = container.querySelectorAll("div")[0];
    expect(div).toHaveClass("dark:bg-gray-700");
    expect(div).toHaveClass("dark:text-gray-300");
  });

  it("should render a chip with custom className, children, and title", () => {
    // Arrange
    const children = <span>Icon</span>;
    const title = "Test Title";
    const className = "custom-class";

    // Act
    const { container } = render(
      <Chip children={children} title={title} className={className} />
    );

    // Assert
    expect(container.firstChild).toHaveClass(
      "flex rounded-full bg-background dark:bg-gray-700 dark:text-gray-300 custom-class"
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass(
      "p flex items-center space-x-2 p-2 text-gray-700 dark:text-gray-300"
    );

    expect(screen.getByRole("button").childNodes[1]).toHaveTextContent(title);
  });
});
