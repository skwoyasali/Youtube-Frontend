import React, { useState, useEffect } from 'react';
import Header from './Components/Header.jsx';
import SideBar from './Components/SideBar.jsx';
import { Outlet } from 'react-router-dom';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchedVal, setSearchedVal] = useState("");
  const [searchActive, setSearchActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [fetchAgain, setFetchAgain] = useState(false); 


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Reset sidebarOpen to false on mobile resize if needed
      if (window.innerWidth <= 792 && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [sidebarOpen]);

  const isMobile = windowWidth <= 792;

  const handleSearch = () => setSearchActive(true);

  return (
    <>
      {/* Header (fixed) */}
<Header
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
  searchedVal={searchedVal}
  setFetchAgain={setFetchAgain}
  setSearchedVal={setSearchedVal}
  onSearch={() => setSearchActive(true)} // ✅ keep this
/>


      {/* Sidebar + Main Content */}
      <div className='flex w-full max-w-screen overflow-hidden'>
        <SideBar sidebarOpen={sidebarOpen} isMobile={isMobile} />

        <main className="w-full flex-1 px-2 sm:px-4 md:px-8">
          <Outlet
            context={{
              fetchAgain,
              sidebarOpen,
              searchedVal,
              setSearchedVal,
              searchActive,
              setSearchActive,
            }}
          />
        </main>
      </div>
    </>
  );
}

export default App;