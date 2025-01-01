import { LoginView } from "@/components/layouts/login/login-view";
import { LoginBg } from "@/components/layouts/login/login-bg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OrgMarquee from '@/components/layouts/landing_page/Marquee';

export default function LoginPage() {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLogin = (formData: { email: string; password: string }) => {
        console.log("Login data:", formData.email, formData.password);

        // Check if email is empty
        if (!formData.email) {
            setErrorMessage("Email is required.");
            return;
        }

        // Check email domain
        const isValidEmail =
            formData.email.endsWith("@iskolarngbayan.pup.edu.ph") ||
            formData.email.endsWith("@pup.edu.ph");

        if (!isValidEmail) {
            setErrorMessage("Email must end with @iskolarngbayan.pup.edu.ph or @pup.edu.ph.");
            return;
        }

        // Clear error message if validation passes
        setErrorMessage("");

        // Simulate navigation to "/home"
        // Note: Replace with your actual API request logic
        navigate("/home");
    };

    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* login & register background */}
            <div className="relative hidden bg-muted lg:block">
                <LoginBg />
                <OrgMarquee className="absolute bottom-0 w-full" rows={4}/>
            </div>

            {/* login form */}
            <div className="flex flex-col gap-1 bg-pup-maroon1 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center flex-col">
                    <div className="w-full max-w-[580px] bg-white p-10 rounded-2xl">
                        <LoginView
                            onSubmit={handleLogin}
                            emailError={errorMessage}
                        />
                    </div>
                    <div className="text-center text-sm text-white mt-4">
                        Don&apos;t have an account?{" "}
                        <Link to="/register">
                            <a href="#" className="underline underline-offset-4 text-pup-gold2">
                                Sign up
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
    
        </div>
    );
}
