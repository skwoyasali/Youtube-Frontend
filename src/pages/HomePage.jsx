import React from 'react';
import VideoList from '../Components/VideoList.jsx';
import { useOutletContext } from 'react-router-dom';

// Homepage: shows video list and handles sidebar state
function Homepage() {
  const { sidebarOpen } = useOutletContext();

  return (
    <>
        <VideoList sidebarOpen={sidebarOpen} /> {/* call VideoList from here and send sideBar prop */}
   </>
  );
}

export default Homepage;
