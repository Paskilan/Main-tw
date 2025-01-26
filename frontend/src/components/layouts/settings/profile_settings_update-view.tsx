import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PictureUploaderInput } from "@/components/commons/PictureUploaderInput";
import FormInput from "@/components/commons/FormInput";
import SingleSelectInput from "@/components/commons/SingleSelectInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import ProfileSettingsView from "./profile_settings_view";
import axios from "axios";

const passwordCriteria = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])[A-Za-z0-9!@#$%^&*_-]{8,}$/;

export default function ProfileSettingsUpdate() {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [colleges, setColleges] = useState<CollegeDto[]>([]);
    const [selectedCollege, setSelectedCollege] = useState<string>("");
    const [email, setEmail] = useState("");
    const [uploadedPicture, setUploadedPicture] = useState<File | null>(null);
    const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

    type CollegeDto = {
        CollegeId: number;
        CollegeName: string;
    };

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(""), 3000);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        const message = getPasswordMessage(value);
        setPasswordError(message);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value !== password ? "Passwords do not match." : "");
    };

    const getPasswordMessage = (pwd: string) => {
        if (!passwordCriteria.test(pwd)) {
            return "Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character.";
        }
        return "";
    };

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/account/colleges`);
                setColleges(response.data);
            } catch (error) {
                console.error("Failed to fetch colleges", error);
                showAlert("Failed to load colleges");
            }
        };
        fetchColleges();
    }, []);

    useEffect(() => {
        if (!isEditing) return;

        const fetchProfile = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                showAlert("Authentication required. Please log in.");
                return;
            }
            setIsLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/account/profile`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setFirstName(data.data.firstName);
                    setLastName(data.data.lastName);
                    setEmail(data.data.email);
                    setSelectedCollege(data.data.collegeId.toString());
                    setProfilePictureUrl(
                        data.data.profilePicture
                            ? `data:image/jpeg;base64,${data.data.profilePicture}`
                            : null
                    );
                } else {
                    showAlert(data.message || "Failed to load profile data");
                }
            } catch (error) {
                console.error("Profile fetch error:", error);
                showAlert("Network error. Please check your connection.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [isEditing]);

    useEffect(() => {
        if (uploadedPicture) {
            const objectUrl = URL.createObjectURL(uploadedPicture);
            return () => URL.revokeObjectURL(objectUrl);
        }
    }, [uploadedPicture]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");
        if (!token) {
            showAlert("Authentication required. Please log in.");
            return;
        }

        const validationMessage = validateFields();
        if (validationMessage) {
            showAlert(validationMessage);
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("collegeId", selectedCollege);
        if (password) formData.append("password", password);
        if (uploadedPicture) {
            formData.append("profilePicture", uploadedPicture, uploadedPicture.name);
        }

        const fetchProfileData = async () => {
            const token = localStorage.getItem("authToken");
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/account/profile`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = await response.json();
            return data.data;
        };


        try {
            const response = await fetch("/api/account/update-profile", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                const updatedProfile = await fetchProfileData();
                setProfilePictureUrl(updatedProfile.profilePictureUrl);
                setIsEditing(false);
            } else {
                showAlert(data.message || "Failed to update profile");
            }
        } catch (error) {
            console.error("Profile update error:", error);
            showAlert("Network error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };


    const validateFields = () => {
        if (!firstName.trim()) return "First name is required.";
        if (!lastName.trim()) return "Last name is required.";
        if (password && getPasswordMessage(password)) return getPasswordMessage(password);
        if (password !== confirmPassword) return "Passwords do not match.";
        return "";
    };

    const handleCancel = () => {
        setIsEditing(false);
        setPassword("");
        setConfirmPassword("");
        setPasswordError("");
        setConfirmPasswordError("");
        setAlertMessage("");
        setUploadedPicture(null);
    };

    if (!isEditing) {
        return (
            <ProfileSettingsView
                onEdit={() => setIsEditing(true)}
                firstName={firstName}
                lastName={lastName}
                college={colleges.find(c => c.CollegeId.toString() === selectedCollege)?.CollegeName || ""}
                profilePicture={profilePictureUrl || undefined}
            />
        );
    }


    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
                <div>
                    <h2 className="font-museo font-semibold text-gray-600">Your profile picture</h2>
                    <PictureUploaderInput
                        onChange={(file: File | null) => setUploadedPicture(file)}
                    />
                </div>
                <div className="flex flex-col px-10 gap-4">
                    <FormInput
                        labelClassName="block form-label"
                        label="First Name"
                        placeholder="Enter your first name"
                        inputClassName="form-input w-full"
                        value={firstName}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                    />
                    <FormInput
                        labelClassName="block form-label"
                        label="Last Name"
                        placeholder="Enter your last name"
                        inputClassName="form-input"
                        value={lastName}
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
                    />
                </div>
            </div>


            <div className="grid gap-3">

                <SingleSelectInput
                    label="College"
                    options={colleges.map(c => ({
                        value: c.CollegeId.toString(),
                        label: c.CollegeName
                    }))}
                    value={selectedCollege}
                    onChange={(value) => setSelectedCollege(value)}
                    disabled
                />

                <FormInput
                    type="email"
                    label="Email"
                    placeholder="Your email address"
                    inputClassName="form-input bg-gray-100 cursor-not-allowed"
                    labelClassName="block form-label"
                    value={email}
                    readOnly
                    disabled
                />

                <FormInput
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                    inputClassName="form-input"
                    labelClassName="block form-label"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}

                <FormInput
                    type="password"
                    label="Confirm your password"
                    placeholder="Confirm your password"
                    inputClassName="form-input"
                    labelClassName="block form-label"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {confirmPasswordError && <p className="text-xs text-red-500">{confirmPasswordError}</p>}

                <div className="flex gap-4 justify-end">
                    <Button 
                        type="button"
                        variant="outline"
                        className="w-1/4 h-12 font-semibold text-base"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-1/4 h-12 bg-pup-maroon2 font-semibold text-base hover:bg-pup-maroon1"
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </div>

            </div>

            {alertMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <Alert variant="destructive" className="bg-white w-64">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
        </form>
    );
}
