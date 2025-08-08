import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Video from './Video.jsx';
import { useOutletContext, useLocation } from 'react-router-dom'; // ✅ useLocation added

function VideoList({sidebarOpen}) {
  const categories = [
    "All", "Programming","Movies", "Songs", "Design", "AI",
    "Gaming", "Vlogs", "Music", "Education"
  ];

  const [videos, setVideos] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const {
    searchedVal,
    setSearchedVal,
    searchActive,
    setSearchActive,
    fetchAgain = false
  } = useOutletContext();

  const location = useLocation(); // ✅ for detecting navigation

  // ✅ Fetch all videos once
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get("https://youtube-backend-0gem.onrender.com/api/videos");
        setVideos(data);
        setFilteredVideos(data);
      } catch (err) {
        console.error("Failed to load videos:", err);
      }
    };
    fetchVideos();
  }, [fetchAgain]);

  // ✅ Filter videos on search
  useEffect(() => {
    if (searchActive) {
      const term = searchedVal.trim().toLowerCase();
      const filtered = videos.filter(v =>
        v.title?.toLowerCase().includes(term)
      );
      setFilteredVideos(filtered);
      setSelectedCategory("All");
      setSearchActive(false);
    }
  }, [searchActive, searchedVal, videos]);

  // ✅ Auto-show all or filtered by category when input is cleared
  useEffect(() => {
    if (searchedVal.trim() === "") {
      if (selectedCategory === "All") {
        setFilteredVideos(videos);
      } else {
        const filtered = videos.filter(v =>
          v.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
        setFilteredVideos(filtered);
      }
    }
  }, [searchedVal, selectedCategory, videos]);

  // ✅ Reset filters when navigating to "/"
  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory("All");
      setSearchedVal("");
      setSearchActive(false);
      setFilteredVideos(videos);
    }
  }, [location.pathname, videos]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearchedVal("");
    setSearchActive(false);

    if (cat === "All") {
      setFilteredVideos(videos);
    } else {
      const filtered = videos.filter(v =>
        v.category?.toLowerCase() === cat.toLowerCase()
      );
      setFilteredVideos(filtered);
    }
  };

  return (
    <div className={`pt-16  ${sidebarOpen ? 'sm:ml-52' : 'sm:ml-20'} transition-all duration-300 `}>
      {/* Category Filter Bar */}
      <div className="flex gap-2 overflow-x-auto py-2 scrollbar-hide mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-4 py-1 rounded-full border text-sm whitespace-nowrap
              ${selectedCategory === cat
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 px-6 py-6">
        {filteredVideos.length > 0 ? (
          filteredVideos.map(video => (
            <Video key={video._id} {...video} />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 mt-10">
            No videos found.
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoList;
