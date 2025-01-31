import { useState } from "react";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/commons/FormInput";
import SingleSelectInput from "@/components/commons/SingleSelectInput";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface GroupDetailsFormProps {
    onBack: () => void;
    onSubmit: (formData: {
        orgName: string;
        description: string;
        email: string;
        classification: "uniwide" | "college";
        collegeId?: string;
        controlNumber?: string;
    }) => Promise<void>;
}

export default function GroupDetailsForm({ onBack, onSubmit }: GroupDetailsFormProps) {
    const [orgName, setOrgName] = useState("");
    const [isValidated, setIsValidated] = useState<"validated" | "new">("new");
    const [controlNumber, setControlNumber] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");
    const [classification, setClassification] = useState<"uniwide" | "college">("uniwide");
    const [college, setCollege] = useState("");
    const [alertMessage, setAlertMessage] = useState("");

    const validateFields = () => {
        if (!orgName.trim()) return "Organization name is required.";
        if (!email.trim()) return "Email is required.";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return "Invalid email format.";
        if (isValidated === "validated" && !controlNumber.trim()) return "Control number is required for validated organizations.";
        if (isValidated === "validated" && !controlNumber.match(/^\d+$/)) return "Control number must be a number.";
        if (!description.trim()) return "Description is required.";
        if (!classification) return "Classification is required.";
        if (classification === "college" && !college) return "College selection is required.";
        return "";
    };

    const showAlert = (message: string) => {
        setAlertMessage(message);
        setTimeout(() => setAlertMessage(""), 3000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationMessage = validateFields();
        if (validationMessage) {
            showAlert(validationMessage);
            return;
        }

        try {
            await onSubmit({
                orgName,
                description,
                email,
                classification,
                collegeId: classification === "college" ? college : undefined,
                controlNumber: isValidated === "validated" ? controlNumber : undefined,
            });
        } catch (error: any) {
            showAlert(error.message || "Failed to create organization");
        }
    };

    return (
        <form className="grid gap-4" onSubmit={handleSubmit}>
            <FormInput
                label="Organization Name *"
                placeholder="Enter organization name"
                value={orgName}
                onChange={(e: { target: { value: string } }) => setOrgName(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <div className="space-y-2">
                <Label>Organization Status *</Label>
                <RadioGroup
                    defaultValue="new"
                    onValueChange={(value: "validated" | "new") => setIsValidated(value)}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="validated" id="validated" />
                        <Label htmlFor="validated">Validated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="new" id="new" />
                        <Label htmlFor="new">New</Label>
                    </div>
                </RadioGroup>
            </div>

            {isValidated === "validated" && (
                <FormInput
                    label="Control Number *"
                    placeholder="Enter control number"
                    value={controlNumber}
                    onChange={(e: { target: { value: string } }) => setControlNumber(e.target.value)}
                    labelClassName="block form-label"
                    inputClassName="form-input"
                    required
                />
            )}

            <FormInput
                label="Email *"
                type="email"
                placeholder="Enter organization email"
                value={email}
                onChange={(e: { target: { value: string } }) => setEmail(e.target.value)}
                labelClassName="block form-label"
                inputClassName="form-input"
                required
            />

            <div className="grid gap-2">
                <Label>Description *</Label>
                <textarea
                    className="form-input min-h-[100px]"
                    placeholder="Enter organization description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            <div className="space-y-2">
                <Label>Classification *</Label>
                <RadioGroup
                    defaultValue="uniwide"
                    onValueChange={(value: "uniwide" | "college") => {
                        setClassification(value);
                        if (value === "uniwide") setCollege("");
                    }}
                    className="flex gap-4"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="uniwide" id="uniwide" />
                        <Label htmlFor="uniwide">Uniwide</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="college" id="college" />
                        <Label htmlFor="college">Specific College</Label>
                    </div>
                </RadioGroup>
            </div>

            {classification === "college" && (
                <SingleSelectInput
                    label="College *"
                    labelClassName="block form-label"
                    inputClassName="form-input"
                    value={college}
                    onChange={(value) => setCollege(value)}
                />
            )}

            <div className="flex gap-2 justify-end mt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                >
                    Back
                </Button>
                <Button
                    type="submit"
                    className="bg-pup-maroon2 hover:bg-pup-maroon1"
                >
                    Create Org
                </Button>
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
