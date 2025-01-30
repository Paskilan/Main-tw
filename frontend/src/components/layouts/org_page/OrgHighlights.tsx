import { useState } from "react";
import { HighlightsModal } from "./HighlightsModal";

interface Highlight {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
}

interface OrgHighlightsProps {
  highlights: Highlight[];
  onUpdateHighlights: (highlights: Highlight[]) => void;
  isAdmin?: boolean;
}

const OrgHighlights = ({
  highlights,
  onUpdateHighlights,
  isAdmin = false,
}: OrgHighlightsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="w-full h-auto bg-white shadow-xl rounded-lg p-3">
      <div className="flex justify-between items-center mb-4">
        <div className="bg-yellow-400 text-red-800 font-museo font-bold px-4 rounded-full inline-block shadow-md">
          Highlights of the Organization
        </div>
        {isAdmin && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 text-gray-600 hover:text-gray-800"
          >
            <span className="text-lg">✎</span>
            <span>Edit Highlights</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        {highlights.map((highlight) => (
          <div
            key={highlight.id}
            className="relative bg-gray-100 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={highlight.imageUrl}
              alt={highlight.title}
              className="w-full h-64 object-cover filter blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white">
                {highlight.title}
              </h3>
              <p className="text-sm text-gray-300">{highlight.description}</p>
            </div>
          </div>
        ))}
      </div>

      <HighlightsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        highlights={highlights}
        onSave={onUpdateHighlights}
      />
    </div>
  );
};

export default OrgHighlights;
