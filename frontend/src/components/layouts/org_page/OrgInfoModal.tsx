import { useState } from "react";

interface OrgInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  orgType: string;
  college: string;
  email: string;
  onSave: (details: {
    orgType: string;
    college: string;
    email: string;
  }) => void;
}

const COLLEGES = [
  { CollegeId: 1, CollegeName: "College of Accountancy and Finance" },
  {
    CollegeId: 2,
    CollegeName: "College of Architecture, Design and the Built Environment",
  },
  { CollegeId: 3, CollegeName: "College of Business Administration" },
  { CollegeId: 4, CollegeName: "College of Computer and Information Sciences" },
  { CollegeId: 5, CollegeName: "College of Engineering" },
  { CollegeId: 6, CollegeName: "College of Human Kinetics" },
  { CollegeId: 7, CollegeName: "College of Law" },
  { CollegeId: 8, CollegeName: "College of Communication" },
  { CollegeId: 9, CollegeName: "College of Education" },
  {
    CollegeId: 10,
    CollegeName: "College of Political Science and Public Administration",
  },
  { CollegeId: 11, CollegeName: "College of Science" },
  {
    CollegeId: 12,
    CollegeName:
      "College of Tourism, Hospitality and Transportation Management",
  },
  { CollegeId: 13, CollegeName: "Graduate School" },
  { CollegeId: 14, CollegeName: "Institute of Technology" },
  { CollegeId: 15, CollegeName: "PUP Laboratory Highschool" },
  { CollegeId: 16, CollegeName: "PUP Senior Highschool" },
  { CollegeId: 17, CollegeName: "College of Social Sciences and Development" },
];

const ORG_TYPES = ["academic", "social", "sports", "political"];

export const OrgInfoModal = ({
  isOpen,
  onClose,
  orgType: initialOrgType,
  college: initialCollege,
  email: initialEmail,
  onSave,
}: OrgInfoModalProps) => {
  const [orgType, setOrgType] = useState(initialOrgType.toLowerCase());
  const [college, setCollege] = useState(initialCollege);
  const [email, setEmail] = useState(initialEmail);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  if (!isOpen) return null;

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const newErrors: { email?: string } = {};

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      orgType: orgType.charAt(0).toUpperCase() + orgType.slice(1),
      college,
      email,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[500px]">
        <h2 className="text-2xl font-bold mb-2">Edit organization details</h2>
        <p className="text-gray-600 text-sm mb-6">
          Fill in your org's details like contact email, college coverage, and
          org type (academic, sports, or political) to engage more iskolar!
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization type
            </label>
            <select
              value={orgType}
              onChange={(e) => setOrgType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              {ORG_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              College
            </label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              {COLLEGES.map((college) => (
                <option key={college.CollegeId} value={college.CollegeName}>
                  {college.CollegeName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors({ ...errors, email: undefined });
                }
              }}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-400`}
              placeholder="Enter organization email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
