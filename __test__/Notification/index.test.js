import { screen, render } from "@testing-library/react";
import Notification from "@/components/Notification";
import "@testing-library/jest-dom";

describe("Notification", () => {
  it("renders correctly", () => {
    render(<Notification />);

    const notiText = screen.getByText("Your channel has been added");

    expect(notiText).toBeInTheDocument();
  });
});
