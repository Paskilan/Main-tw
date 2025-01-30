import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Button } from "@/components/ui/button";
import PaskilanCircle from "@/assets/paskilan_circle.png";
import FormInput from "@/components/commons/FormInput";

export function LoginView() {
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/account/login`,
                { email, password }
            );

            localStorage.setItem("authToken", response.data.token);
            navigate("/feature");
        } catch (err) {
            setError("Invalid credentials");
            console.error("Login failed:", err);
        }
    };

    return (
        <form className={cn("flex flex-col gap-6")} onSubmit={handleFormSubmit}>
            <div className="flex flex-col items-start gap-2">
                <img src={PaskilanCircle} alt="Paskilan Logo" className="w-[35px] h-[35px]" />
            </div>
            <div className="grid gap-5">
                <FormInput
                    label="PUP Webmail"
                    labelClassName="font-semibold"
                    inputClassName="border p-2 rounded"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="juandc@iskolarngbayan.pup.edu.ph"
                    required
                />
                {error && <p className="text-xs text-red-500">{error}</p>
                }

                <FormInput
                    label="Password"
                    labelClassName="font-semibold"
                    inputClassName="border p-2 rounded"
                    id="password"
                    name="password"
                    type="password"
                    required
                />
                <div className="flex justify-center">
                    <Button type="submit" className="w-1/2 p-6 rounded-full bg-pup-gold1 hover:bg-pup-gold3">
                        Login
                    </Button>
                </div>
            </div>
        </form>
    );
}