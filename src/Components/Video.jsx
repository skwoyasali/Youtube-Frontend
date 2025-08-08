import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function Video({ _id, title, channel, views, thumbnail, uploadDate }) {
  return (
    <div className="w-full">
      <Link to={`/Video/${_id}`}>
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-48 sm:h-44 md:h-48 lg:h-52 xl:h-56 object-cover rounded-xl transition duration-300 hover:brightness-90"
        />
      </Link>

      <div className="flex gap-3 mt-3">
        {/* Channel Icon */}
        <Link to={`/channels/${channel._id}`}>
          <img
            src={channel.channelPic}
            alt={channel.channelName}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
          />
        </Link>

        <div className="flex flex-col overflow-hidden">
          {/* Video Title */}
          <Link
            to={`/Video/${_id}`}
            className="text-sm sm:text-base font-medium text-black dark:text-white hover:text-red-600 truncate"
          >
            {title}
          </Link>

          {/* Channel Name */}
          <Link
            to={`/channels/${channel._id}`}
            className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:underline truncate"
          >
            {channel.channelName}
          </Link>

          {/* Views and Date */}
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {views} views
            {uploadDate && (
              <span className="ml-1">
                • {formatDistanceToNow(new Date(uploadDate), { addSuffix: true }).replace('about ', '')}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
