import axios from "axios";
import { LoginView } from "@/components/layouts/login/login-view";
import { LoginBg } from "@/components/layouts/login/login-bg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrgMarquee from '@/components/layouts/landing_page/OrgMarquee';

export default function LoginPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleLogin = async (formData: { email: string; password: string }) => {
        if (!formData.email) {
            setErrorMessage("Email is required.");
            return;
        }

        const isValidEmail =
            formData.email.endsWith("@iskolarngbayan.pup.edu.ph") ||
            formData.email.endsWith("@pup.edu.ph");

        if (!isValidEmail) {
            setErrorMessage("Email must end with @iskolarngbayan.pup.edu.ph or @pup.edu.ph.");
            return;
        }

        setErrorMessage("");
        setIsLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Account/login`, formData);
            console.log("Login successful:", response.data);
            localStorage.setItem("token", response.data.token);
            navigate("/home");
        } catch (error: any) {
            setErrorMessage(error.response?.data?.message || "Invalid credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="relative hidden bg-muted lg:block">
                <LoginBg />
                <OrgMarquee className="absolute bottom-0 w-full" rows={4} />
            </div>

            <div className="flex flex-col gap-1 bg-pup-maroon1 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center flex-col">
                    <div className="w-full max-w-[580px] bg-white p-10 rounded-2xl">
                        <LoginView onSubmit={handleLogin} emailError={errorMessage} />
                        {isLoading && <p>Loading...</p>}
                    </div>
                    <div className="text-center text-sm text-white mt-4">
                        Don&apos;t have an account?{" "}
                        <Link to="/register" className="underline underline-offset-4 text-pup-gold2">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
