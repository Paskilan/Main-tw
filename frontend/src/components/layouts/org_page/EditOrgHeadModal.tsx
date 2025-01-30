import { useState, useRef } from "react";

interface OrgHead {
  id: number;
  name: string;
  imageUrl: string;
  role: string;
}

interface EditOrgHeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgHead?: OrgHead;
  onSave: (orgHead: OrgHead) => void;
}

export const EditOrgHeadModal = ({
  isOpen,
  onClose,
  orgHead,
  onSave,
}: EditOrgHeadModalProps) => {
  const [name, setName] = useState(orgHead?.name || "");
  const [role, setRole] = useState(orgHead?.role || "");
  const [imageUrl, setImageUrl] = useState(orgHead?.imageUrl || "");
  const [errors, setErrors] = useState<{
    name?: string;
    role?: string;
  }>({});

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { name?: string; role?: string } = {};
    let isValid = true;

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!role.trim()) {
      newErrors.role = "Position is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    onSave({
      id: orgHead?.id || Date.now(),
      name: name.trim(),
      role: role.trim(),
      imageUrl: imageUrl || "https://via.placeholder.com/100",
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
          {orgHead ? "Edit Organization Head" : "Add Organization Head"}
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          {orgHead
            ? "Update the details of your organization leadership. Edit their name, position, and any other relevant information."
            : "Introduce your leaders to help students connect with your organization."}
        </p>

        <div className="flex gap-6">
          {/* Left side - Image */}
          <div className="w-1/3">
            <label className="relative block aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
              <img
                src={imageUrl || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                <span className="text-white opacity-0 hover:opacity-100">
                  Change Photo
                </span>
              </div>
            </label>
          </div>

          {/* Right side - Form */}
          <div className="w-2/3 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: undefined });
                }}
                className={`w-full px-3 py-2 border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position name
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  if (errors.role) setErrors({ ...errors, role: undefined });
                }}
                className={`w-full px-3 py-2 border ${
                  errors.role ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400`}
                placeholder="Enter position name"
              />
              {errors.role && (
                <p className="mt-1 text-sm text-red-500">{errors.role}</p>
              )}
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
