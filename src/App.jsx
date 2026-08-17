import CollectionSection from "./components/CollectionSection.jsx";
import Hero from "./components/Hero.jsx";
import LifestyleSection from "./components/LifestyleSection.jsx";
import Navbar from "./components/Navbar.jsx";
import SareeDetailPage from "./pages/SareeDetailPage.jsx";

function getSareeId(pathname) {
  const match = pathname.match(/^\/sarees\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function App() {
  const productId = getSareeId(window.location.pathname);

  return (
    <>
      <Navbar />
      {productId ? (
        <SareeDetailPage productId={productId} />
      ) : (
        <main>
          <Hero />
          <CollectionSection />
          <LifestyleSection />
        </main>
      )}
    </>
  );
}

export default App;
