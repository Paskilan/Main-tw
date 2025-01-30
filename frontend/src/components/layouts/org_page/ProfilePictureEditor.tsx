import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cropper } from "react-cropper";
import { useDropzone } from "react-dropzone";
import "cropperjs/dist/cropper.css";

interface ProfilePictureEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (profilePic: string, headerPic: string) => void;
  currentProfilePic?: string;
  currentHeaderPic?: string;
}

interface CropPopupProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  aspectRatio: number;
  onCropComplete: (croppedImage: string) => void;
  title: string;
}

function CropPopup({
  isOpen,
  onClose,
  image,
  aspectRatio,
  onCropComplete,
  title,
}: CropPopupProps) {
  const [cropper, setCropper] = useState<any>(null);

  const handleSave = () => {
    const croppedImage = cropper?.getCroppedCanvas().toDataURL();
    onCropComplete(croppedImage);
    onClose();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[800px] max-h-[85vh] overflow-y-auto">
          <Dialog.Title className="text-2xl font-bold mb-6 text-center">
            {title}
          </Dialog.Title>

          <div className="h-[500px] border-2 border-gray-300 rounded-lg overflow-hidden">
            <Cropper
              src={image}
              style={{ height: "100%", width: "100%" }}
              aspectRatio={aspectRatio}
              guides={true}
              viewMode={1}
              dragMode="move"
              background={false}
              autoCropArea={1}
              responsive={true}
              checkOrientation={false}
              onInitialized={(instance) => setCropper(instance)}
            />
          </div>

          <div className="mt-6 flex justify-center space-x-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Confirm Crop
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function ProfilePictureEditor({
  isOpen,
  onClose,
  onSave,
  currentProfilePic,
  currentHeaderPic,
}: ProfilePictureEditorProps) {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [headerImage, setHeaderImage] = useState<string | null>(null);
  const [tempProfileImage, setTempProfileImage] = useState<string | null>(null);
  const [tempHeaderImage, setTempHeaderImage] = useState<string | null>(null);
  const [showProfileCrop, setShowProfileCrop] = useState(false);
  const [showHeaderCrop, setShowHeaderCrop] = useState(false);

  const onProfileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempProfileImage(reader.result as string);
        setShowProfileCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onHeaderDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setTempHeaderImage(reader.result as string);
        setShowHeaderCrop(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const {
    getRootProps: getProfileRootProps,
    getInputProps: getProfileInputProps,
  } = useDropzone({
    onDrop: onProfileDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const {
    getRootProps: getHeaderRootProps,
    getInputProps: getHeaderInputProps,
  } = useDropzone({
    onDrop: onHeaderDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
  });

  const handleSave = () => {
    onSave(profileImage || "", headerImage || "");
    onClose();
  };

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={onClose}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[500px] max-h-[85vh] overflow-y-auto">
            <Dialog.Title className="text-2xl font-bold mb-6 text-center">
              Edit Profile
            </Dialog.Title>

            <div className="space-y-8">
              {/* Header Picture Section */}
              <div>
                {headerImage ? (
                  <div className="relative w-full h-[200px] border-2 border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={headerImage}
                      alt="Header"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setShowHeaderCrop(true)}
                      className="absolute bottom-2 right-2 px-4 py-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div
                    {...getHeaderRootProps()}
                    className="w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <input {...getHeaderInputProps()} />
                    <div className="text-center">
                      <p className="text-gray-500">
                        Click to upload header image
                      </p>
                      <p className="text-sm text-gray-400">or drag and drop</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Picture Section */}
              <div className="flex justify-center">
                {profileImage ? (
                  <div className="relative">
                    <div className="w-[150px] h-[150px] rounded-full border-2 border-gray-300 overflow-hidden">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      onClick={() => setShowProfileCrop(true)}
                      className="absolute bottom-2 right-2 px-4 py-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div
                    {...getProfileRootProps()}
                    className="w-[150px] h-[150px] rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <input {...getProfileInputProps()} />
                    <div className="text-center">
                      <p className="text-gray-500">Click to upload</p>
                      <p className="text-sm text-gray-400">profile image</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-center space-x-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      {/* Crop Popups */}
      {tempProfileImage && (
        <CropPopup
          isOpen={showProfileCrop}
          onClose={() => setShowProfileCrop(false)}
          image={tempProfileImage}
          aspectRatio={1}
          title="Crop Profile Picture"
          onCropComplete={(croppedImage) => {
            setProfileImage(croppedImage);
            setTempProfileImage(null);
          }}
        />
      )}

      {tempHeaderImage && (
        <CropPopup
          isOpen={showHeaderCrop}
          onClose={() => setShowHeaderCrop(false)}
          image={tempHeaderImage}
          aspectRatio={3}
          title="Crop Header Picture"
          onCropComplete={(croppedImage) => {
            setHeaderImage(croppedImage);
            setTempHeaderImage(null);
          }}
        />
      )}
    </>
  );
}
