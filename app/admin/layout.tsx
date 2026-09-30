import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { AdminSidebar } from "@/components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAuthenticatedAdmin();

  // If not authenticated, do not render the dashboard sidebar.
  // This allows /admin/login to render a full-screen, distraction-free executive portal.
  if (!isAuth) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-30 w-full h-full bg-slate-950 text-slate-100 flex flex-col md:flex-row overflow-hidden select-auto">
      <AdminSidebar />
      {/* Main Content Area: Single dedicated smooth-scroll container */}
      <div
        role="region"
        aria-label="Admin Workspace"
        className="flex-1 min-h-0 min-w-0 h-full overflow-y-auto overscroll-y-contain admin-scrollbar bg-slate-950 focus:outline-none"
      >
        <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 pb-28">
          {children}
        </div>
      </div>
    </div>
  );
}

