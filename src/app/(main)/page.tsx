import { AuthGuard } from "@/features/auth/components/auth-guard";
import { CustomerClubPage } from "@/features/customer-club/components/customer-club-page";

export default function HomePage() {
  return (
    <AuthGuard>
      <CustomerClubPage />
    </AuthGuard>
  );
}
