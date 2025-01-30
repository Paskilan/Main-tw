import { useState } from "react";
import { DescriptionModal } from "./DescriptionModal";

interface OrgDescriptionProps {
  description: string;
  onUpdateDescription: (description: string) => void;
  isAdmin?: boolean;
}

const OrgDescription = ({
  description,
  onUpdateDescription,
  isAdmin = false,
}: OrgDescriptionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-64 bg-white shadow-xl rounded-lg p-3">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
          Description
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <span className="text-lg">✎</span>
            <span>Edit Description</span>
          </button>
        )}
      </div>
      <p className="mt-4 text-sm text-poppins text-justify">{description}</p>

      <DescriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        description={description}
        onSave={onUpdateDescription}
      />
    </div>
  );
};

export default OrgDescription;
