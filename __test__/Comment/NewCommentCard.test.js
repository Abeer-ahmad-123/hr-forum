import { render, screen } from "@testing-library/react";
import NewCommentCard from "@/components/shared/comment/NewCommentCard";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

describe("NewCommentCard", () => {
  const onAdd = jest.fn();
  beforeEach(() => {
    render(<NewCommentCard onAdd={onAdd} />);
  });
  const user = userEvent.setup();

  it("text area should be empty initially", async () => {
    // Simulate user entering text in the comment box
    const commentBox = screen.getAllByRole("textbox");
    expect(commentBox[0].value).toBe("");

    await user.type(commentBox[0], "this is a test comment");

    expect(commentBox[0].value).toBe("this is a test comment");
  });

  // Test that the text in the comment box is cleared when the 'x' button is clicked
  it("should clear text when send button is clicked", async () => {
    const commentBox = screen.getAllByRole("textbox");
    expect(commentBox[0].value).toBe("");

    await user.type(commentBox[0], "this is a test comment");

    expect(commentBox[0].value).toBe("this is a test comment");

    const button = screen.getAllByRole("button");
    await user.click(button[0]);

    expect(commentBox[0].value).toBe("");
  });
});
