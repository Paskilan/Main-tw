import { useState } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PictureUploaderInput } from "@/components/commons/PictureUploaderInput";
import GroupDetailsForm  from "@/components/layouts/settings/GroupDetailsForm"
import axios from "axios";

interface CreateOrgModalProps {
    onNewGroup: (newGroup: { id: number; name: string; description: string; imageUrl: string }) => void;
}

export default function CreateOrgModal({ onNewGroup }: CreateOrgModalProps) {
    const [step, setStep] = useState(1);
    const [alertMessage, setAlertMessage] = useState("");
    const [pictureUploaded, setPictureUploaded] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleNext = () => {
        if (!pictureUploaded) {
            setAlertMessage("Please upload an org photo first");
            setTimeout(() => setAlertMessage(""), 3000);
            return;
        }
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleFormSubmit = async (formData: {
        orgName: string;
        description: string;
        email: string;
        classification: "uniwide" | "college";
        collegeId?: string;
        controlNumber?: string;
    }) => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setAlertMessage("Authentication required");
                return;
            }

            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/Orgs`,
                {
                    Name: formData.orgName,
                    Description: formData.description,
                    Email: formData.email,
                    ImageUrl: imageUrl,
                    Classification: formData.classification,
                    CollegeId: formData.collegeId,
                    ControlNumber: formData.controlNumber
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 200) {
                onNewGroup({
                    id: response.data.id,
                    name: response.data.orgName,
                    description: response.data.orgDescription,
                    imageUrl: response.data.orgLogo,
                    status: response.data.verified === "Yes" ? "Approved" : "Pending"
                });
            
            } else {
                setAlertMessage("Failed to create organization");
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.status === 400) {
                    setAlertMessage(error.response.data || "Invalid input data");
                } else if (error.response.status === 401) {
                    setAlertMessage("Unauthorized: Please log in again");
                } else {
                    setAlertMessage(error.response.data?.message || "Failed to create organization");
                }
            } else if (error.request) {
                setAlertMessage("No response from server. Please check your network connection.");
            } else {
                setAlertMessage("An unexpected error occurred.");
            }
        }
    };


    return (
        <DialogContent className="sm:max-w-[425px] bg-white">
            <DialogHeader>
                <DialogTitle>
                    {step === 1 ? "Upload Org Photo" : "Org Details"}
                </DialogTitle>
            </DialogHeader>

            {step === 1 ? (
                <div className="grid gap-4">
                    <PictureUploaderInput
                        onChange={(file) => {
                            if (file) {
                                setPictureUploaded(true);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImageUrl(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            } else {
                                setPictureUploaded(false);
                                setImageUrl("");
                            }
                        }}
                    />
                    <Button
                        onClick={handleNext}
                        className="w-full bg-pup-maroon2 hover:bg-pup-maroon1"
                    >
                        Next
                    </Button>
                </div>
            ) : (
                    <GroupDetailsForm onBack={handleBack}
                        onSubmit={handleFormSubmit}
                        imageUrl={imageUrl} />
            )}

            {alertMessage && (
                <div className="fixed top-4 right-4 z-50">
                    <Alert variant="destructive" className="bg-white w-64">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{alertMessage}</AlertDescription>
                    </Alert>
                </div>
            )}
        </DialogContent>
    );
}