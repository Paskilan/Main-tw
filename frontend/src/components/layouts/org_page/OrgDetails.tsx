import { useState } from "react";
import { OrgDetailsModal } from "./OrgDetailsModal";

interface OrgDetailsProps {
  orgDetails: {
    organization: string;
    college: string;
    email: string;
    socials: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  onUpdateDetails: (details: {
    organization: string;
    college: string;
    email: string;
  }) => void;
  onUpdateSocials: (socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => void;
  isAdmin?: boolean;
}

const OrgDetails = ({
  orgDetails,
  onUpdateDetails,
  onUpdateSocials,
  isAdmin = false,
}: OrgDetailsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
          Org Details
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <span className="text-lg">✎</span>
            <span>Edit Org Details</span>
          </button>
        )}
      </div>

      <div className="mt-4">
        <div className="flex justify-start space-x-4">
          <span className="font-museo text-red-800 font-bold text-base">
            Organization:
          </span>
          <span className="font-poppins text-base">
            {orgDetails?.organization || "Not specified"}
          </span>
        </div>

        <div className="flex justify-start space-x-4 mt-2">
          <span className="font-museo text-red-800 font-bold text-base">
            College:
          </span>
          <span className="font-poppins text-base">
            {orgDetails?.college || "Not specified"}
          </span>
        </div>

        <div className="flex justify-start space-x-4 mt-2">
          <span className="font-museo text-red-800 font-bold text-base">
            Email:
          </span>
          <span className="font-poppins text-base">
            {orgDetails?.email || "Not specified"}
          </span>
        </div>

        {/* Socials */}
        <div className="flex flex-col justify-start mt-4">
          <span className="font-museo text-red-800 font-bold text-base">
            Socials:
          </span>
          <div className="flex space-x-6 mt-2 justify-start">
            {orgDetails?.socials &&
            Object.entries(orgDetails.socials).some(([_, link]) => link) ? (
              Object.entries(orgDetails.socials).map(
                ([platform, link]) =>
                  link && (
                    <a
                      key={platform}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={`https://www.vectorlogo.zone/logos/${platform}/${platform}-icon.svg`}
                        alt={platform}
                        className="w-12 h-12 rounded-full border-2 border-yellow-400"
                      />
                    </a>
                  )
              )
            ) : (
              <span className="font-poppins text-base text-gray-600">
                No socials available
              </span>
            )}
          </div>
        </div>
      </div>

      <OrgDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orgType={orgDetails.organization}
        college={orgDetails.college}
        email={orgDetails.email}
        socials={orgDetails.socials}
        onUpdateDetails={(details) => {
          onUpdateDetails({
            organization: details.orgType,
            college: details.college,
            email: details.email,
          });
        }}
        onUpdateSocials={onUpdateSocials}
      />
    </div>
  );
};

export default OrgDetails;
