import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import InputField from "@/components/shared/InputField";
import "@testing-library/jest-dom";

describe("InputField", () => {
  const mockData = {
    label: "Mock label",
    type: "text",
    error: "Mock Error",
  };

  beforeEach(() => {
    render(
      <InputField
        label={mockData.label}
        type={mockData.type}
        error={mockData.error}
      />
    );
  });

  it("renders correctly", () => {
    const inputField = screen.getByRole("textbox", {
      name: mockData.label,
    });

    expect(inputField).toBeInTheDocument();
  });

  it("user can type correctly", () => {
    const inputField = screen.getByRole("textbox", {
      name: mockData.label,
    });

    user.click(inputField);
    user.keyboard("Testing");

    expect(inputField).toBeInTheDocument();
  });
});
