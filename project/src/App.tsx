import Calendario2025 from './components/Calendario2025';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 text-center">
          Calendário 2025
        </h1>
      </header>
      <main className="container mx-auto py-8">
        <Calendario2025 />
      </main>
    </div>
  );
}

export default App;