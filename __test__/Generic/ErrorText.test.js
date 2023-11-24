import { render, screen } from "@testing-library/react";
import ErrorText from "@/components/shared/ErrorText";
import "@testing-library/jest-dom";

describe("ErrorText", () => {
  const mockText = "Error";

  it("renders correctly", () => {
    render(<ErrorText text={mockText} />);

    const errorText = screen.getByText(mockText);
    expect(errorText).toBeInTheDocument();
  });
});
