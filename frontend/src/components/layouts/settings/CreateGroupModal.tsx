import { useState, useEffect } from "react";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { PictureUploaderInput } from "@/components/commons/PictureUploaderInput";
import GroupDetailsForm from "@/components/layouts/settings/GroupDetailsForm";
import axios from "axios";

interface CreateOrgModalProps {
    onNewGroup: (newGroup: {
        id: number;
        name: string;
        description: string;
        imageUrl: string;
        status: string;
    }) => void;
}

export default function CreateOrgModal({ onNewGroup }: CreateOrgModalProps) {
    const [step, setStep] = useState(1);
    const [alertMessage, setAlertMessage] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");

        setToken(storedToken);
    }, []);

    const handleNext = () => {
        if (!imageFile) {
            setAlertMessage("Please upload an org photo first");
            return;
        }
        if (!validateImage(imageFile)) return;

        setAlertMessage("");
        setStep(2);
    };

    const validateImage = (file: File) => {
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            setAlertMessage("Image size must be less than 5MB");
            return false;
        }
        return true;
    };

    const convertToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    resolve(reader.result.split(",")[1]); // Remove metadata
                } else {
                    reject("Failed to read file.");
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };



    const handleSubmit = async (formData: {
        orgName: string;
        description: string;
        email: string;
        classification: "uniwide" | "college";
        collegeId?: string;
        controlNumber?: string;
        isVerified: boolean;
    }) => {
        if (!imageFile) {
            setAlertMessage("Please upload an org photo first");
            return;
        }

        const imageBase64 = await convertToBase64(imageFile);
        const requestData = {
            orgName: formData.orgName,
            description: formData.description,
            email: formData.email,
            classification: formData.classification,
            collegeId: formData.collegeId,
            controlNumber: formData.controlNumber,
            isVerified: formData.isVerified,
            imageBase64: imageBase64,
        };

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/orgs/create`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Add auth token
                    },
                }
            );

            if (response.data.success) {
                onNewGroup({
                    id: response.data.data.id,
                    name: response.data.data.name,
                    description: response.data.data.description,
                    imageUrl: response.data.data.imageUrl,
                    status: response.data.data.verified ? "Approved" : "Pending",
                });
            } else {
                setAlertMessage(response.data.message);
            }
        } catch (error) {
            setAlertMessage(error.response?.data?.message || "An error occurred while creating the organization");
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
                                if (!validateImage(file)) return;
                                setImageFile(file);
                                const reader = new FileReader();
                                reader.onloadend = () => {
                                    setImagePreview(reader.result as string);
                                };
                                reader.readAsDataURL(file);
                            } else {
                                setImageFile(null);
                                setImagePreview(""); 
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
                <GroupDetailsForm
                    onBack={() => setStep(1)}
                    onSubmit={handleSubmit}
                    imagePreview={imagePreview} // Pass imagePreview to the form
                />
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
