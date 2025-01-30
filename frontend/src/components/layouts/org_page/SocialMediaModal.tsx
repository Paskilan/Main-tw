import { useState } from "react";

interface SocialMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  onSave: (socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }) => void;
}

export const SocialMediaModal = ({
  isOpen,
  onClose,
  socials: initialSocials,
  onSave,
}: SocialMediaModalProps) => {
  const [socials, setSocials] = useState(initialSocials);
  const [errors, setErrors] = useState<{
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  }>({});

  if (!isOpen) return null;

  const validateUrl = (url: string, platform: string) => {
    if (!url) return true; // Empty URLs are allowed

    try {
      const urlObj = new URL(url);
      switch (platform) {
        case "facebook":
          return urlObj.hostname.includes("facebook.com");
        case "instagram":
          return urlObj.hostname.includes("instagram.com");
        case "linkedin":
          return urlObj.hostname.includes("linkedin.com");
        default:
          return false;
      }
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};
    let hasErrors = false;

    Object.entries(socials).forEach(([platform, url]) => {
      if (url && !validateUrl(url, platform)) {
        newErrors[platform] = `Please enter a valid ${platform} URL`;
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    // Clean up empty strings to undefined
    const cleanedSocials = Object.fromEntries(
      Object.entries(socials).map(([key, value]) => [key, value || undefined])
    );

    onSave(cleanedSocials);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-2">Link Social Media</h2>
        <p className="text-gray-600 text-sm mb-6">
          Complete your organization identity by linking your social media to
          reach with more students, you can leave blank if not applicable.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook
            </label>
            <input
              type="url"
              value={socials.facebook || ""}
              onChange={(e) => {
                setSocials({ ...socials, facebook: e.target.value });
                if (errors.facebook) {
                  setErrors({ ...errors, facebook: undefined });
                }
              }}
              className={`w-full px-3 py-2 border ${
                errors.facebook ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400`}
              placeholder="https://facebook.com/your-page"
            />
            {errors.facebook && (
              <p className="mt-1 text-sm text-red-500">{errors.facebook}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram
            </label>
            <input
              type="url"
              value={socials.instagram || ""}
              onChange={(e) => {
                setSocials({ ...socials, instagram: e.target.value });
                if (errors.instagram) {
                  setErrors({ ...errors, instagram: undefined });
                }
              }}
              className={`w-full px-3 py-2 border ${
                errors.instagram ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400`}
              placeholder="https://instagram.com/your-profile"
            />
            {errors.instagram && (
              <p className="mt-1 text-sm text-red-500">{errors.instagram}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LinkedIn
            </label>
            <input
              type="url"
              value={socials.linkedin || ""}
              onChange={(e) => {
                setSocials({ ...socials, linkedin: e.target.value });
                if (errors.linkedin) {
                  setErrors({ ...errors, linkedin: undefined });
                }
              }}
              className={`w-full px-3 py-2 border ${
                errors.linkedin ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400`}
              placeholder="https://linkedin.com/company/your-company"
            />
            {errors.linkedin && (
              <p className="mt-1 text-sm text-red-500">{errors.linkedin}</p>
            )}
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
