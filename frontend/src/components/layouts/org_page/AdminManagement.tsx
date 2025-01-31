import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

interface Admin {
  name: string;
  email: string;
}

interface AdminManagementProps {
  isOpen: boolean;
  onClose: () => void;
  currentAdmins?: Admin[];
  onRemoveAdmin: (email: string) => void;
  onAddAdmin: (admin: Admin) => void;
}

export function AdminManagement({
  isOpen,
  onClose,
  currentAdmins,
  onRemoveAdmin,
  onAddAdmin,
}: AdminManagementProps) {
  const [showAddAdminModal, setShowAddAdminModal] = useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[500px] max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <div>
              <Dialog.Title className="text-2xl font-bold">
                Manage admin
              </Dialog.Title>
              <p className="text-gray-600 text-sm">
                Manage organization posting by consolidating admins
              </p>
            </div>
            <button
              onClick={() => setShowAddAdminModal(true)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-colors"
            >
              Add new admin
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {currentAdmins?.map((admin) => (
              <div
                key={admin.email}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg"
              >
                <div>
                  <h3 className="font-semibold">{admin.name}</h3>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
                <button
                  onClick={() => onRemoveAdmin(admin.email)}
                  className="px-4 py-1 text-sm text-red-600 hover:text-red-800 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>

      <AddAdminModal
        isOpen={showAddAdminModal}
        onClose={() => setShowAddAdminModal(false)}
        onAdd={(admin) => {
          onAddAdmin(admin);
          setShowAddAdminModal(false);
        }}
      />
    </Dialog.Root>
  );
}

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (admin: Admin) => void;
}

function AddAdminModal({ isOpen, onClose, onAdd }: AddAdminModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    // Validate email
    if (!email.endsWith("@iskolarngbayan.pup.edu.ph")) {
      setError("Email must end with @iskolarngbayan.pup.edu.ph");
      return;
    }

    onAdd({ name, email });
    setName("");
    setEmail("");
    setError(null);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[400px]">
          <Dialog.Title className="text-2xl font-bold mb-6">
            Add New Admin
          </Dialog.Title>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter admin name"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                placeholder="Enter admin email"
              />
              {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-white text-gray-700 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Confirm
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-red-900 text-white rounded-full hover:bg-red-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
