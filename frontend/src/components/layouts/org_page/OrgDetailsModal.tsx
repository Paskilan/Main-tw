import { useState } from "react";
import { OrgInfoModal } from "./OrgInfoModal";
import { SocialMediaModal } from "./SocialMediaModal";

interface OrgDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgType: string;
  college: string;
  email: string;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  onUpdateDetails: (details: {
    orgType: string;
    college: string;
    email: string;
  }) => void;
  onUpdateSocials: (socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => void;
}

export const OrgDetailsModal = ({
  isOpen,
  onClose,
  orgType,
  college,
  email,
  socials,
  onUpdateDetails,
  onUpdateSocials,
}: OrgDetailsModalProps) => {
  const [showOrgInfo, setShowOrgInfo] = useState(false);
  const [showSocialMedia, setShowSocialMedia] = useState(false);

  if (!isOpen && !showOrgInfo && !showSocialMedia) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-2xl font-bold mb-2">Org Details</h2>
            <p className="text-gray-600 text-sm mb-6">
              Complete setting up your organization info and link your socials
              to connect with more students
            </p>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setShowOrgInfo(true);
                }}
                className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                  <p className="text-center font-medium">
                    Update your org's info: type, college, and contact email.
                  </p>
                </div>
              </button>

              <button
                onClick={() => {
                  setShowSocialMedia(true);
                }}
                className="bg-gray-100 p-6 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <p className="text-center font-medium">
                    Link social media account of your organization
                  </p>
                </div>
              </button>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <OrgInfoModal
        isOpen={showOrgInfo}
        onClose={() => {
          setShowOrgInfo(false);
          onClose();
        }}
        orgType={orgType}
        college={college}
        email={email}
        onSave={(details) => {
          onUpdateDetails(details);
          setShowOrgInfo(false);
          onClose();
        }}
      />

      <SocialMediaModal
        isOpen={showSocialMedia}
        onClose={() => {
          setShowSocialMedia(false);
          onClose();
        }}
        socials={socials}
        onSave={(newSocials) => {
          onUpdateSocials(newSocials);
          setShowSocialMedia(false);
          onClose();
        }}
      />
    </>
  );
};
