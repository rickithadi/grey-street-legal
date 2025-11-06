import About from './components/About';
import Attorneys from './components/Attorneys';
import ClosingCTA from './components/ClosingCTA';
import Footer from './components/Footer';
import Hero from './components/Hero';

function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Hero />
      <About />
      <Attorneys />
      <ClosingCTA />
      <Footer />
    </div>
  );
}

export default App;
