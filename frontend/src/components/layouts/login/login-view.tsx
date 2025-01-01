import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import PaskilanCircle from "@/assets/paskilan_circle.png";
import FormInput from "@/components/commons/FormInput";

interface LoginFormProps {
    onSubmit: (formData: { email: string; password: string }) => void;
    emailError?: string; // New prop to handle email error message
}

export function LoginView({ onSubmit, emailError }: LoginFormProps) {
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        onSubmit({ email, password });
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
                {/* Show error message under the email input */}
                {emailError && (
                    <p className="text-xs text-red-500">{emailError}</p>
                )}

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
