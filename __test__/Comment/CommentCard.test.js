import { render, screen } from "@testing-library/react";
import CommentCard from "@/components/shared/comment/CommentCard";
import "@testing-library/jest-dom";

describe("CommentCard", () => {
  // Test that the CommentCard component renders correctly when there is no comment
  it("should render correctly when there is no comment", () => {
    render(<CommentCard />);
    expect(screen.queryByAltText("comment-avatar")).not.toBeInTheDocument();
    expect(screen.queryByText("ramsesmiron")).not.toBeInTheDocument();
  });

  // Test that the CommentCard component renders without a username when the comment prop is not provided
  it("should render without a username when comment prop is not provided", () => {
    render(<CommentCard />);
    expect(screen.queryByText(/ramsesmiron/i)).not.toBeInTheDocument();
  });

  // Test that the CommentCard component renders correctly when there is no comment content
  it("should render correctly with no content", () => {
    render(<CommentCard comment={null} />);
    expect(screen.queryByAltText("comment-avatar")).not.toBeInTheDocument();
    expect(screen.queryByText("ramsesmiron")).not.toBeInTheDocument();
  });

  // Test that the CommentCard component renders correctly when given an empty comment object
  it("should render correctly with empty comment object", () => {
    render(<CommentCard comment={null} />);
    expect(screen.queryByAltText("comment-avatar")).not.toBeInTheDocument();
    expect(screen.queryByText("ramsesmiron")).not.toBeInTheDocument();
  });

  // Test that the CommentCard component renders with all the information correctly
  it("should render comment card with all information correctly", () => {
    const comment = {
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      user: {
        image: {
          png: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          webp: "https://example.com/images/avatars/image-johnsmith.webp",
        },
        username: "ramsesmiron",
      },
    };
    render(<CommentCard comment={comment} />);
    expect(screen.getByAltText("comment-avatar")).toBeInTheDocument();
    expect(screen.getByText("ramsesmiron")).toBeInTheDocument();
    expect(screen.getByText(comment.content)).toBeInTheDocument();
  });

  // Test that the comment card renders correctly when the content contains special characters
  it("should render correctly with special characters in content", () => {
    const comment = {
      content:
        "This is a comment with special characters: !@#$%^&*()_+{}|:\"<>?`~-=[]\\;',./",
      user: {
        image: {
          png: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          webp: "https://example.com/images/avatars/image-johnsmith.webp",
        },
        username: "ramsesmiron",
      },
    };
    render(<CommentCard comment={comment} />);
    expect(screen.getByText(comment.content)).toBeInTheDocument();
  });

  // Test that the CommentCard component renders without CommentActions
  it("should render without CommentActions", () => {
    const comment = {
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      user: {
        image: {
          png: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          webp: "https://example.com/images/avatars/image-johnsmith.webp",
        },
        username: "ramsesmiron",
      },
    };
    render(<CommentCard comment={comment} />);
    expect(screen.queryByText("Like")).toBeNull();
    expect(screen.queryByText("Reply")).toBeNull();
    expect(screen.queryByText("3h")).toBeNull();
    expect(screen.queryByText("16 likes")).toBeNull();
  });

  // Test that the CommentCard component renders the comment card with different image formats
  it("should render comment card with different image formats", () => {
    const comment = {
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      user: {
        image: {
          png: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVvcGxlfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
          webp: "https://example.com/images/avatars/image-johnsmith.webp",
        },
        username: "ramsesmiron",
      },
    };
    render(<CommentCard comment={comment} />);
    expect(screen.getByAltText("comment-avatar")).toBeInTheDocument();
  });
});
