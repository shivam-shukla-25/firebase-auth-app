import type { FirebaseError } from "firebase/app";

export const mapAuthError = (error: FirebaseError): string => {
  switch (error.code) {
    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/invalid-credential":
      return "Invalid email or password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    default:
      return "Something went wrong. Please try again.";
  }
};
