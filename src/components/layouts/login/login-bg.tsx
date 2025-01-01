
import Paskilan from '@/assets/Paskilan.png';

export function LoginBg() {
    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center gap-2">
                <img className="block pt-52 w-[60%] h-auto mx-auto" src={Paskilan} alt="Paskilan Logo" />
                <p className="text-center font-normal mx-auto w-[60%] text-lg">
                    A PUP-Exclusive Organization Events App
                </p>
            </div>
        </div>
    );
}

