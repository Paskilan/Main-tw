import { useState, useEffect } from "react";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  description: string;
  onSave: (description: string) => void;
}

const MAX_CHARACTERS = 500;

export const DescriptionModal = ({
  isOpen,
  onClose,
  description,
  onSave,
}: DescriptionModalProps) => {
  const [editedDescription, setEditedDescription] = useState(description);
  const [charactersRemaining, setCharactersRemaining] = useState(
    MAX_CHARACTERS - description.length
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setEditedDescription(description);
    setCharactersRemaining(MAX_CHARACTERS - description.length);
  }, [description]);

  const handleDescriptionChange = (value: string) => {
    const remaining = MAX_CHARACTERS - value.length;
    setCharactersRemaining(remaining);
    setError(remaining < 0);
    setEditedDescription(value);
  };

  const handleSubmit = () => {
    if (charactersRemaining >= 0) {
      onSave(editedDescription);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-4">Edit Description</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={editedDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className={`w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 ${
                error
                  ? "focus:ring-red-500 border-red-500"
                  : "focus:ring-yellow-400"
              }`}
              rows={6}
            />
            <div
              className={`text-right text-sm mt-1 ${
                error ? "text-red-500" : "text-gray-500"
              }`}
            >
              {charactersRemaining} characters remaining
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={error}
            className={`px-6 py-2 rounded-full ${
              error
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
