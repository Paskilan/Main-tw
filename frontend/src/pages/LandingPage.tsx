import React from 'react';
import { Link } from 'react-router-dom';
import Paskilan from '@/assets/Paskilan.png';
import { Button } from "@/components/ui/button"
import OrgMarquee from '@/components/layouts/landing_page/OrgMarquee';


const LandingPage = () => {
    return (
        <div className="flex flex-col items-center">
            <div>
                <img className="block pt-52 w-1/2 h-auto mx-auto" src={Paskilan} alt="Paskilan Logo" />
                
            </div>
            <div>
                <p className="block text-center font-normal my-10 mx-auto w-11/12 md:w-1/2">
                    Paskilan is a PUP web-based platform for campus event promotion and student engagement that creates a centralized online hub where campus organizations can promote their events and activities.
                </p>
            </div>
    
            <div className="flex flex-col items-center gap-2 mt-4">
                <Link to="/login">
                    <Button
                        className="bg-pup-maroon2 text-white px-10 py-7
                       rounded-lg font-bold text-lg
                       transition-colors duration-300
                       hover:bg-pup-maroon-hover">
                        Login
                    </Button>
                </Link>

                <Link to="/register">
                    <Button
                        variant="outline"
                        className="bg-white border-2 border-pup-maroon1 
               text-pup-maroon1 py-2 px-6 rounded-lg 
               font-bold text-sm">
                        Sign Up
                    </Button>
                </Link>
            </div>
            <OrgMarquee />

        </div>
    );
}

export default LandingPage;