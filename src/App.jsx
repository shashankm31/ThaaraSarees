import { useCallback, useEffect, useState } from "react";
import CollectionSection from "./components/CollectionSection.jsx";
import FeaturedSection from "./components/FeaturedSection.jsx";
import { CraftsmanshipSection, EditorialVisualBreak, GallerySection, OccasionSection, PersonalStyling, ThaaraEdit } from "./components/EditorialSections.jsx";
import AboutSection from "./components/AboutSection.jsx";
import Hero from "./components/Hero.jsx";
import LifestyleSection from "./components/LifestyleSection.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/EditorialFooter.jsx";
import { isSupabaseConfigured, supabase } from "./config/supabase.js";
import { isCurrentUserAdmin } from "./services/admin.js";
import AdminPage from "./pages/AdminPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import SareeDetailPage from "./pages/SareeDetailPage.jsx";

function getSareeId(pathname) {
  const match = pathname.match(/^\/sarees\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function navigate(pathname) {
  window.history.replaceState(null, "", pathname);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

function AdminSessionLoading() {
  return <main className="admin-auth-page" aria-live="polite"><p className="admin-session-loading">Checking your secure session…</p></main>;
}

function AdminRedirect({ to }) {
  useEffect(() => navigate(to), [to]);
  return <AdminSessionLoading />;
}

function AdminAccessDenied({ onLogout }) {
  return <main className="admin-auth-page"><section className="admin-auth-card"><p className="admin-auth-eyebrow">Administration</p><h1>Access unavailable</h1><p className="admin-auth-intro">This account is not on the Thaara Sarees administrator allowlist.</p><button className="button button--wine" type="button" onClick={onLogout}>Return to login</button></section></main>;
}

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const [session, setSession] = useState(null);
  const [isCheckingSession, setIsCheckingSession] = useState(isAdminPath(pathname));
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const productId = getSareeId(pathname);
  const adminPath = isAdminPath(pathname);
  const loginPath = pathname === "/admin/login";

  useEffect(() => {
    const handlePopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!adminPath) return undefined;
    if (!isSupabaseConfigured || !supabase) {
      setSession(null);
      setIsCheckingSession(false);
      return undefined;
    }

    let isMounted = true;
    setIsCheckingSession(true);
    supabase.auth.getSession().then(({ data }) => {
      if (isMounted) {
        setSession(data.session);
        setIsCheckingSession(false);
      }
    }).catch(() => {
      if (isMounted) {
        setSession(null);
        setIsCheckingSession(false);
      }
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (isMounted) {
        setSession(nextSession);
        setIsCheckingSession(false);
      }
    });
    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [adminPath]);

  useEffect(() => {
    if (!adminPath || !session?.user?.id || loginPath) return undefined;
    let isMounted = true;
    setIsCheckingAdmin(true);
    isCurrentUserAdmin(session.user.id).then((allowed) => {
      if (isMounted) { setIsAdmin(allowed); setIsCheckingAdmin(false); }
    }).catch(() => {
      if (isMounted) { setIsAdmin(false); setIsCheckingAdmin(false); }
    });
    return () => { isMounted = false; };
  }, [adminPath, loginPath, session]);

  const openAdmin = useCallback(() => navigate("/admin"), []);
  const openLogin = useCallback(() => navigate("/admin/login"), []);
  const signOutAndOpenLogin = useCallback(async () => { if (supabase) await supabase.auth.signOut(); openLogin(); }, [openLogin]);

  if (adminPath) {
    if (loginPath) return <AdminLoginPage isAuthenticated={Boolean(session)} onAuthenticated={openAdmin} />;
    if (isCheckingSession) return <AdminSessionLoading />;
    if (!session) return <AdminRedirect to="/admin/login" />;
    if (isCheckingAdmin) return <AdminSessionLoading />;
    if (!isAdmin) return <AdminAccessDenied onLogout={signOutAndOpenLogin} />;
    const activeSection = pathname === "/admin/products/new" ? "new" : pathname === "/admin/products" || /^\/admin\/products\/[^/]+\/edit\/?$/.test(pathname) ? "products" : "dashboard";
    return <AdminPage user={session.user} activeSection={activeSection} pathname={pathname} onNavigate={navigate} onLoggedOut={openLogin} />;
  }

  return (
    <>
      <Navbar />
      {productId ? (
        <SareeDetailPage productId={productId} />
      ) : (
        <main>
          <Hero />
          <ThaaraEdit />
          <FeaturedSection />
          <EditorialVisualBreak />
          <CraftsmanshipSection />
          <AboutSection />
          <OccasionSection />
          <LifestyleSection />
          <PersonalStyling />
          <GallerySection />
          <CollectionSection />
        </main>
      )}
      <Footer />
    </>
  );
}

export default App;
