import { render, screen } from "@testing-library/react";

// import { render, screen } from 'test-utils';
import Alert from "./index";

describe("Alert Component", () => {
  it("should display the error message when error prop is passed", () => {
    render(<Alert error="Something went wrong!" />);
    expect(screen.queryByText(/error!/i)).toBeTruthy();
    expect(screen.queryByText(/something went wrong!/i)).toBeTruthy();
  });

  it("should display the success message when success prop is passed", () => {
    render(<Alert success="Operation successful!" />);
    expect(screen.queryByText(/success!/i)).toBeTruthy();
    expect(screen.queryByText(/operation successful!/i)).toBeTruthy();
  });

  it("should not render anything when neither error nor success is passed", () => {
    const { container } = render(<Alert />);
    expect(container.firstChild).toBeNull();
  });
});
