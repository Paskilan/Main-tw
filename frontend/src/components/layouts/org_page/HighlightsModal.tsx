import { useState } from "react";

interface Highlight {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

interface HighlightsModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlights: Highlight[];
  onSave: (highlights: Highlight[]) => void;
}

interface EditHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlight?: Highlight;
  onSave: (highlight: Highlight) => void;
}

export const EditHighlightModal = ({
  isOpen,
  onClose,
  highlight,
  onSave,
}: EditHighlightModalProps) => {
  const [title, setTitle] = useState(highlight?.title || "");
  const [description, setDescription] = useState(highlight?.description || "");
  const [imageUrl, setImageUrl] = useState(highlight?.imageUrl || "");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSave({
      id: highlight?.id || Date.now(),
      title,
      description,
      imageUrl,
    });
    onClose();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-2">
          {highlight ? "Edit Highlights" : "Add highlights"}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Share biggest moments and milestone of organization
        </p>

        <div className="flex gap-8">
          {/* Left side - Image */}
          <div className="w-1/2">
            <label className="relative block aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                    <span className="text-4xl text-gray-400">+</span>
                  </div>
                  <span className="text-sm text-gray-500">Add highlights</span>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Right side - Form */}
          <div className="w-1/2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
                placeholder="Enter title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
                rows={3}
                placeholder="Enter description"
              />
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
            className="px-6 py-2 border border-gray-300 rounded-full hover:bg-gray-50"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export const HighlightsModal = ({
  isOpen,
  onClose,
  highlights,
  onSave,
}: HighlightsModalProps) => {
  const [editedHighlights, setEditedHighlights] =
    useState<Highlight[]>(highlights);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentHighlight, setCurrentHighlight] = useState<
    Highlight | undefined
  >();

  if (!isOpen) return null;

  const handleAddHighlight = () => {
    if (editedHighlights.length >= 3) {
      alert("Maximum of 3 highlights allowed");
      return;
    }
    setCurrentHighlight(undefined);
    setEditModalOpen(true);
  };

  const handleEditHighlight = (highlight: Highlight) => {
    setCurrentHighlight(highlight);
    setEditModalOpen(true);
  };

  const handleDeleteHighlight = (id: number) => {
    setEditedHighlights(editedHighlights.filter((h) => h.id !== id));
  };

  const handleSaveHighlight = (highlight: Highlight) => {
    if (currentHighlight) {
      setEditedHighlights(
        editedHighlights.map((h) =>
          h.id === currentHighlight.id ? highlight : h
        )
      );
    } else {
      setEditedHighlights([...editedHighlights, highlight]);
    }
  };

  const handleConfirm = () => {
    onSave(editedHighlights);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
        <div className="bg-white rounded-lg p-6 w-[800px]">
          <h2 className="text-2xl font-bold mb-4">
            Highlights of Organization
          </h2>
          <p className="text-gray-600 mb-4">
            Share biggest moments and milestone of organization
          </p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            {editedHighlights.map((highlight) => (
              <div key={highlight.id} className="relative">
                <img
                  src={highlight.imageUrl}
                  alt={highlight.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 space-x-2">
                  <button
                    onClick={() => handleEditHighlight(highlight)}
                    className="p-1 bg-yellow-400 rounded-full"
                  >
                    ✎
                  </button>
                  <button
                    onClick={() => handleDeleteHighlight(highlight.id)}
                    className="p-1 bg-red-500 text-white rounded-full"
                  >
                    ×
                  </button>
                </div>
                <div className="mt-2">
                  <h3 className="font-bold">{highlight.title}</h3>
                  <p className="text-sm text-gray-600">
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
            {editedHighlights.length < 3 && (
              <button
                onClick={handleAddHighlight}
                className="h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
              >
                <span className="text-4xl text-gray-400">+</span>
              </button>
            )}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {editedHighlights.length} / 3 highlights
            </span>
            <div className="space-x-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-red-900 text-white rounded-lg hover:bg-red-700"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-yellow-400 text-red-800 rounded-lg hover:bg-yellow-500"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditHighlightModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        highlight={currentHighlight}
        onSave={handleSaveHighlight}
      />
    </>
  );
};
