"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import PaskilanCircle from "@/assets/paskilan_circle.png";
import FormInput from "@/components/commons/FormInput"; // Importing FormInput from components/commons
import SingleSelectInput from "@/components/commons/SingleSelectInput"; // Importing SingleSelectInput from components/commons

export function RegisterView({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const [password, setPassword] = React.useState("");

  // Updated Password Validation
  const passwordCriteria = /^(?=.*[0-9])(?=.*[!@#$%^&*_\-])[A-Za-z0-9!@#$%^&*_\-]{8,}$/;

  const getPasswordMessage = () => {
    if (!password) return "Use 8 or more characters with a mix of letters, numbers & symbols";
    if (!passwordCriteria.test(password)) return "Password must be at least 8 characters long and can include letters, numbers, underscores, and dashes.";
    return "";
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
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
                required
              />
            </div>
            <div className="flex-1">
              <FormInput
                label="Last Name"
                id="lastName"
                type="text"
                placeholder="Dela Cruz"
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
          required
        />

        {/* College Dropdown */}
        <SingleSelectInput />

        {/* Password */}
        <div className="grid gap-2">
          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} // Explicitly typing `e`
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
