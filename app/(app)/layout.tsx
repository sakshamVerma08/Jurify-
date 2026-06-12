import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/auth-helper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Deep database session verification.
  // This securely intercepts any unauthenticated user trying to access the app routes
  // and safely bounces them back to the login page.
  const session = await requireAuth();

  if (!session) {
    redirect("/login");
  }

  // The user is authenticated. Render the protected layout.
  // Note: Individual pages inside (app) render their own <Navbar />.
  return <>{children}</>;
}
