import { ZodError } from "zod";

class ErrorHandler {
  static handleAuth(error: unknown) {
    if (error instanceof Error) {
      return {
        status: false,
        message: error.message || "Authentication failed",
        errors: null,
      };
    }
    return {
      status: false,
      message: "Unknown authentication error",
      errors: null,
    };
  }

  static handleZod(error: ZodError) {
    const errors = error.issues.reduce(
      (acc, issue) => {
        const path = issue.path.at(-1)?.toString() ?? "unknown";
        acc[path] = issue.message;
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      status: false as const,
      message: "Validation error",
      errors,
    };
  }

  static handleDefault(error: unknown) {
    return {
      status: false,
      message:
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again later.",
      errors: {
        code: 500,
        description: "Internal server error.",
      },
    };
  }
}

export default ErrorHandler;
