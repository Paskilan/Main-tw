import { useState } from "react";
import { OrgHeadsModal } from "./OrgHeadsModal";

interface OrgHead {
  id: number;
  name: string;
  imageUrl: string;
  role: string;
}

interface OrgHeadsProps {
  orgHeads: OrgHead[];
  onUpdateOrgHeads: (orgHeads: OrgHead[]) => void;
  isAdmin?: boolean;
}

const OrgHeads = ({
  orgHeads,
  onUpdateOrgHeads,
  isAdmin = false,
}: OrgHeadsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-64 bg-white shadow-xl rounded-lg p-3">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
          Org Heads
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <span className="text-lg">✎</span>
            <span>Edit Org Heads</span>
          </button>
        )}
      </div>

      {/* Horizontal Scrollable Container for Org Heads */}
      <div className="flex justify-center space-x-4 mt-4 overflow-x-auto">
        {orgHeads?.length ? (
          orgHeads.map((head) => (
            <div
              key={head.id}
              className="flex-shrink-0 flex flex-col items-center text-center"
            >
              <img
                src={head.imageUrl || "https://via.placeholder.com/100"}
                alt={head.name}
                className="w-16 h-16 rounded-full border-2 border-yellow-400 object-cover"
              />
              <div className="mt-2 font-poppins text-base font-bold text-red-800">
                {head.name}
              </div>
              <div className="mt-1 font-poppins text-sm text-gray-600">
                {head.role || "Role not available"}
              </div>
            </div>
          ))
        ) : (
          <span className="font-poppins text-base text-gray-600">
            No org heads available
          </span>
        )}
      </div>

      <OrgHeadsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        orgHeads={orgHeads}
        onSave={onUpdateOrgHeads}
      />
    </div>
  );
};

export default OrgHeads;
