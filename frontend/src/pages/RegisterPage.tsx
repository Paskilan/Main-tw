import { RegisterView } from "@/components/layouts/register/register-view";
import {LoginBg} from "@/components/layouts/login/login-bg";
import { Link } from "react-router-dom";
import OrgMarquee from '@/components/layouts/landing_page/Marquee';

export default function RegisterPage() {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {/* login & register background */}
            <div className="relative hidden bg-muted lg:block">
                <LoginBg />
                <OrgMarquee className="absolute bottom-0 w-full" rows={4}/>
            </div>
            
            {/* register form */}
            <div className="flex flex-col gap-1 bg-pup-gold1 p-6 md:p-10">
                <div className="flex flex-1 items-center justify-center flex-col">
                    <div className="w-full max-w-[580px] bg-white p-10 rounded-2xl">
                        <RegisterView />
                    </div>
                    <div className="text-center text-sm text-white mt-4">
                        Already have an account?{"  "}
                        <Link to="/login">
                            <a href="#" className="underline underline-offset-4 text-pup-maroon2">
                                 Log in
                            </a>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
}