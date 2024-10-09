import React from "react";

interface AlertProps {
  error?: string;
  success?: string;
}

const Alert: React.FC<AlertProps> = ({ error, success }) => {
  if (error) {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show"
        role="alert"
      >
        <strong>Error!</strong> {error}
      </div>
    );
  } else if (success) {
    return (
      <div
        className="alert alert-success alert-dismissible fade show"
        role="alert"
      >
        <strong>Success!</strong> {success}
      </div>
    );
  } else {
    return <></>;
  }
};

// export default Alert;

// import { render, screen } from '@testing-library/react';
// import Alert from './Alert';

// describe('Alert Component', () => {
//   it('should display the error message when error prop is passed', () => {
//     render(<Alert error="Something went wrong!" />);
//     expect(screen.getByText(/error!/i)).toBeInTheDocument();
//     expect(screen.getByText(/something went wrong!/i)).toBeInTheDocument();
//   });

//   it('should display the success message when success prop is passed', () => {
//     render(<Alert success="Operation successful!" />);
//     expect(screen.getByText(/success!/i)).toBeInTheDocument();
//     expect(screen.getByText(/operation successful!/i)).toBeInTheDocument();
//   });

//   it('should not render anything when neither error nor success is passed', () => {
//     const { container } = render(<Alert />);
//     expect(container.firstChild).toBeNull();
//   });
// });
