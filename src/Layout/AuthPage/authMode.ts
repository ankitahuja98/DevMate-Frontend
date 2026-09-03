/* Which of the three cards the auth screen is showing. Lives in its own
   module so the brand panel can react to it without importing the page
   that renders it. */
export type AuthMode = "signin" | "signup" | "forgot";
