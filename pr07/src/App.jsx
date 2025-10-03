import { useState } from 'react';
import { RiMenu5Line } from 'react-icons/ri';
import Sidebar from './components/sidebar.jsx';
import Threads from './components/Threads.jsx';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#0b0b15] text-white overflow-hidden">
      <Threads
        color={[1, 1, 1]}
        amplitude={0.6}
        distance={0.4}
        enableMouseInteraction={false}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b0b15] to-transparent pointer-events-none" />

      <div className="relative z-20 flex min-h-screen">
        {isSidebarOpen && <Sidebar onClose={toggleSidebar} />}

        <div className="flex-1 flex flex-col">
          <header className="p-4">
            {!isSidebarOpen && (
              <button
                type="button"
                onClick={toggleSidebar}
                className="p-2 rounded hover:bg-white/10 transition hover:cursor-pointer"
              >
                <RiMenu5Line className="h-6 w-6 text-white" />
              </button>
            )}
          </header>

          <main className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <h1 className="bg-gradient-to-r pb-2 from-blue-500 via-teal-500 to-pink-500 bg-clip-text text-transparent text-5xl font-extrabold transition hover:scale-105 hover:drop-shadow-lg">
                Welcome to my Website
              </h1>
              <h3 className="mt-4 text-base text-gray-600 tracking-wide transition hover:text-black">
                This is the main content of the webpage
              </h3>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
