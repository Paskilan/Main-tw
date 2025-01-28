"use client";

import * as React from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PaskilanCircle from "@/assets/paskilan_circle.png";
import FormInput from "@/components/commons/FormInput";
import SingleSelectInput from "@/components/commons/SingleSelectInput"; 

export function RegisterView({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"form">) {
    const [password, setPassword] = React.useState("");
    const [formData, setFormData] = React.useState({
        firstName: "",
        lastName: "",
        email: "",
        collegeId: 0,
        password: "",
    });

    const passwordCriteria = /^(?=.*[0-9])(?=.*[!@#$%^&*_-])[A-Za-z0-9!@#$%^&*_-]{8,}$/;

    const getPasswordMessage = () => {
        if (!password) return "Use 8 or more characters with a mix of letters, numbers & symbols";
        if (!passwordCriteria.test(password)) return "Password must be at least 8 characters long and can include letters, numbers, underscores, and dashes.";
        return "";
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValidEmail =
            formData.email.endsWith("@iskolarngbayan.pup.edu.ph") ||
            formData.email.endsWith("@pup.edu.ph");

        if (!isValidEmail) {
            alert("Please use a valid PUP email address");
            return;
        }

        if (!passwordCriteria.test(formData.password)) {
            alert("Password does not meet requirements");
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/Account/register`,
                {
                    FirstName: formData.firstName,   
                    LastName: formData.lastName,     
                    Email: formData.email,           
                    CollegeId: formData.collegeId,
                    Password: formData.password      
                });

            localStorage.setItem("authToken", response.data.token);
            console.log("Registration successful:", response.data);
            alert("Registration successful!");
        } catch (error) {
            console.error("Error registering user:", error);
            alert("Error registering user. Please try again.");
        }
    };

    return (
        <form className={cn("flex flex-col gap-6", className)}
            {...props}
            onSubmit={handleSubmit}>
            <div className="flex items-center justify-start gap-2">
                <img src={PaskilanCircle} alt="Paskilan Logo" className="w-[35px] h-[35px]" />
                <p className="text-lg text-pup-gold3">Sign up using your PUP Webmail</p>
            </div>
            <div className="grid gap-5">
                {/* First Name and Last Name */}
                <div className="grid gap-2">
                    <div className="flex gap-2">
                        <div className="flex-1">
                            <FormInput
                                label="First Name"
                                id="firstName"
                                type="text"
                                placeholder="Juan"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="flex-1">
                            <FormInput
                                label="Last Name"
                                id="lastName"
                                type="text"
                                placeholder="Dela Cruz"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* PUP Webmail */}
                <FormInput
                    label="PUP Webmail address"
                    id="email"
                    type="email"
                    placeholder="juandc@iskolarngbayan.pup.edu.ph"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                />

                {/* College Dropdown */}
                <SingleSelectInput
                    onChange={(value: string) => setFormData((prev) => ({ ...prev, collegeId: parseInt(value, 10) }))}
                    value={formData.collegeId.toString()}
                />

                {/* Password */}
                <div className="grid gap-2">
                    <FormInput
                        label="Password"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                            handleInputChange(e);
                        }}
                        required
                    />
                    {getPasswordMessage() && (
                        <p className={`text-xs ${password ? "text-red-500" : "text-gray-500"}`}>
                            {getPasswordMessage()}
                        </p>
                    )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center gap-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms">
                        By creating an account, I agree to the <a href="#terms" className="underline">Terms of Use</a> and <a href="#privacy" className="underline">Privacy Policy</a>.
                    </Label>
                </div>

                {/* Sign Up Button */}
                <div className="flex justify-center">
                    <Button type="submit" className="w-1/2 p-6 rounded-full bg-pup-gold2 hover:bg-pup-gold1">
                        Sign Up
                    </Button>
                </div>
            </div>
        </form>
    );
}