import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PictureUploaderInput } from "@/components/commons/PictureUploaderInput";
import FormInput from "@/components/commons/FormInput";
import SingleSelectInput from "@/components/commons/SingleSelectInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const passwordCriteria = /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])[A-Za-z0-9!@#$%^&*_\-]{8,}$/;

export default function ProfileSettingsUpdate() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [college, setCollege] = useState("");
    const [pictureUploaded, setPictureUploaded] = useState(false);

    const getPasswordMessage = () => {
        if (!passwordCriteria.test(password)) {
            return "Password must be at least 8 characters long, contain a number, and a special character.";
        }
        return "";
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        const message = getPasswordMessage();
        setPasswordError(message);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        setConfirmPasswordError(value !== password ? "Passwords do not match." : "");
    };

    const validateFields = () => {
        if (!pictureUploaded) return "Profile picture is required.";
        if (!firstName.trim()) return "First name is required.";
        if (!lastName.trim()) return "Last name is required.";
        if (!college.trim()) return "College is required.";
        return "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const validationMessage = validateFields();
        if (validationMessage) {
            setAlertMessage(validationMessage);
            setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
            return;
        }

        const passwordMessage = getPasswordMessage();
        const confirmMessage = confirmPassword !== password ? "Passwords do not match." : "";

        if (passwordMessage || confirmMessage) {
            setAlertMessage(passwordMessage || confirmMessage);
            setTimeout(() => setAlertMessage(""), 3000); // Clear the alert after 3 seconds
            return;
        }

        // Proceed with form submission logic
        alert("Profile updated successfully!");
    };

    return (
        <form className="grid gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-wrap">
                <div>
                    <h2 className="font-museo font-semibold text-gray-600">Your profile picture</h2>
                    <PictureUploaderInput
                        onChange={() => setPictureUploaded(true)} 
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

                <SingleSelectInput
                    label="College"
                    labelClassName="block form-label"
                    inputClassName="form-input"
                    value={college}
                    onChange={(value) => setCollege(value)} // Ensure the component passes the correct value
                />

                <Button className="w-1/4 h-12 bg-pup-maroon2 font-semibold text-base hover:bg-pup-maroon1">
                    Save
                </Button>
            </div>

            {/* Floating Alert */}
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
