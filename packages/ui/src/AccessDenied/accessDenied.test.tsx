import { fireEvent, render, screen } from "@testing-library/react";

import AccessDenied from "@acme/ui/AccessDenied/accessDenied";

describe("AccessDenied Component", () => {
  it("renders with default props", () => {
    render(<AccessDenied isOpen={true} />);
    expect(screen.getByText("Access Denied")).toBeInTheDocument();
    expect(
      screen.getByText(
        "This area is restricted. Please contact the administrator.",
      ),
    ).toBeInTheDocument();
  });

  it("triggers onClose when closed", () => {
    const mockOnClose = jest.fn();
    render(<AccessDenied isOpen={true} onClose={mockOnClose} />);
    fireEvent.click(screen.getByText("Go Back"));
    expect(mockOnClose).toHaveBeenCalled();
  });
});