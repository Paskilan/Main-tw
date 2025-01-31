import { useState } from "react";
import { ProfilePictureEditor } from "./ProfilePictureEditor";

interface ProfilePictureButtonProps {
  imageUrl: string;
  bannerImageUrl: string;
  onSavePictures: (profilePic: File, headerPic: File) => void;
}

export function ProfilePictureButton({
  imageUrl,
  bannerImageUrl,
  onSavePictures,
}: ProfilePictureButtonProps) {
  // State for controlling the picture editor modal
  const [isPictureEditorOpen, setIsPictureEditorOpen] = useState(false);

  return (
    <>
      {/* Profile Picture Container */}
      <div className="flex items-center justify-center relative">
        {/* Profile Picture */}
        <img
          src={imageUrl}
          alt="Org Icon"
          className="w-40 h-40 rounded-full object-cover z-10 shadow-xl"
          draggable="false"
        />

        {/* Edit Button */}
        <button
          onClick={() => setIsPictureEditorOpen(true)}
          className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        </button>
      </div>

      {/* Picture Editor Modal */}
      <ProfilePictureEditor
        isOpen={isPictureEditorOpen}
        onClose={() => setIsPictureEditorOpen(false)}
        onSave={onSavePictures}
        currentProfilePic={imageUrl}
        currentHeaderPic={bannerImageUrl}
      />
    </>
  );
}
