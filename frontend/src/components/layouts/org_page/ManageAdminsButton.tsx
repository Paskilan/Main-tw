import { useState } from "react";
import { AdminManagement } from "./AdminManagement";

interface Admin {
  name: string;
  email: string;
}

interface ManageAdminsButtonProps {
  orgData: {
    admins: Admin[];
  };
  onUpdateAdmins: (admins: Admin[]) => void;
}

export function ManageAdminsButton({
  orgData,
  onUpdateAdmins,
}: ManageAdminsButtonProps) {
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleRemoveAdmin = async (email: string) => {
    try {
      // Here you would make an API call to remove the admin
      // await removeAdminFromDatabase(email);

      const updatedAdmins = orgData.admins.filter(
        (admin) => admin.email !== email
      );
      onUpdateAdmins(updatedAdmins);
    } catch (error) {
      console.error("Failed to remove admin:", error);
    }
  };

  const handleAddAdmin = async (admin: Admin) => {
    try {
      // Here you would make an API call to add the admin
      // await addAdminToDatabase(admin);

      const updatedAdmins = [...orgData.admins, admin];
      onUpdateAdmins(updatedAdmins);
    } catch (error) {
      console.error("Failed to add admin:", error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsAdminModalOpen(true)}
        className="px-6 py-2 bg-amber-600 text-white text-l font-museo rounded-lg shadow-md hover:bg-amber-800"
      >
        Manage Admins
      </button>

      <AdminManagement
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        currentAdmins={orgData.admins}
        onRemoveAdmin={handleRemoveAdmin}
        onAddAdmin={handleAddAdmin}
      />
    </>
  );
}
