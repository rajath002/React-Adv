import React from "react";

interface IErrorBoundaryProps {
  children: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
  message: string;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, message: "", error: null };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, message: error.message, error: error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <h1>
          Something went wrong. <br />
          <p style={{ color: "red" }}>{this.state.message}</p>
          <p>{JSON.stringify(this.state.error, null, 2)}</p>
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
