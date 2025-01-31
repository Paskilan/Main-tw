import { useState } from "react";
import { EditOrgHeadModal } from "./EditOrgHeadModal";

interface OrgHead {
  id: number;
  name: string;
  imageUrl: string;
  role: string;
}

interface OrgHeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgHeads: OrgHead[];
  onSave: (orgHeads: OrgHead[]) => void;
}

export const OrgHeadsModal = ({
  isOpen,
  onClose,
  orgHeads,
  onSave,
}: OrgHeadsModalProps) => {
  const [editedOrgHeads, setEditedOrgHeads] = useState<OrgHead[]>(orgHeads);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentOrgHead, setCurrentOrgHead] = useState<OrgHead | undefined>();

  if (!isOpen && !editModalOpen) return null;

  const handleAddOrgHead = () => {
    setCurrentOrgHead(undefined);
    setEditModalOpen(true);
  };

  const handleEditOrgHead = (orgHead: OrgHead) => {
    setCurrentOrgHead(orgHead);
    setEditModalOpen(true);
  };

  const handleDeleteOrgHead = (id: number) => {
    setEditedOrgHeads(editedOrgHeads.filter((head) => head.id !== id));
  };

  const handleSaveOrgHead = (orgHead: OrgHead) => {
    if (currentOrgHead) {
      setEditedOrgHeads(
        editedOrgHeads.map((head) =>
          head.id === currentOrgHead.id ? orgHead : head
        )
      );
    } else {
      setEditedOrgHeads([...editedOrgHeads, { ...orgHead, id: Date.now() }]);
    }
  };

  const handleConfirm = () => {
    onSave(editedOrgHeads);
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Org Heads</h2>
              <button
                onClick={handleAddOrgHead}
                className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
              >
                Add heads
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Help students discover and connect with the leaders of your
              organization by adding detailed profiles of your organization
              heads.
            </p>

            <div className="space-y-3 mb-6">
              {editedOrgHeads.map((head) => (
                <div
                  key={head.id}
                  className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={head.imageUrl || "https://via.placeholder.com/100"}
                      alt={head.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{head.name}</div>
                      <div className="text-gray-600 text-sm">{head.role}</div>
                    </div>
                  </div>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditOrgHead(head)}
                      className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteOrgHead(head.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <EditOrgHeadModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        orgHead={currentOrgHead}
        onSave={handleSaveOrgHead}
      />
    </>
  );
};
