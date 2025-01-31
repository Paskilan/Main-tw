import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileSettingsView({ onEdit, firstName, lastName, profilePicture }: { onEdit: () => void, firstName: string, lastName: string, profilePicture?: string }) {
    const [profileData, setProfileData] = useState({
        firstName: '',
        lastName: '',
        collegeName: '',
        profilePicture: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/account/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log('Full Response:', response);

                if (response.data && response.data.data) {
                    setProfileData({
                        firstName: response.data.data.firstName,
                        lastName: response.data.data.lastName,
                        collegeName: response.data.data.collegeName,
                        profilePicture: response.data.data.profilePicture
                            ?`data:image/jpeg;base64,${response.data.data.profilePicture}`
                            : ''
                    });
                }
            } catch (err) {
                setError("Failed to fetch profile data");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }; fetchProfileData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="grid gap-6">
            <div className="flex flex-wrap">
                <div>
                    <h2 className="h-10 font-museo font-semibold text-gray-600">Your profile picture</h2>
                    <div className="w-48 h-48 rounded-full overflow-hidden border-2 border-gray-200">
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No image</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex flex-col px-10 gap-4">
                    <div className="grid gap-2">
                        <label className="block form-label text-sm font-medium">First Name</label>
                        <p className="form-input w-full bg-gray-50 flex items-center">
                            {firstName || <span className="text-gray-400">Not set</span>}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <label className="block form-label text-sm font-medium">Last Name</label>
                        <p className="form-input bg-gray-50 flex items-center">
                            {lastName || <span className="text-gray-400">Not set</span>}
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <label className="block form-label text-sm font-medium">College</label>
                        <p className="form-input bg-gray-50 flex items-center justify-center">
                            {profileData.collegeName || <span className="text-gray-400">Not set</span>}
                        </p>
                    </div>
                </div>
            </div>
            <div className="grid gap-3">
                <Button
                    onClick={onEdit}
                    className="w-1/4 h-12 bg-pup-maroon2 font-semibold text-base hover:bg-pup-maroon1"
                >
                    Edit Profile
                </Button>
            </div>
        </div>
    );
}