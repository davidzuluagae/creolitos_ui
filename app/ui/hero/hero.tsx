import {CreolitosLogo} from '@/app/ui/creolitos-logo';
import RotatingWelcome from '../rotatingMsg';

export default function Hero() {
    return (
        <div className="flex flex-col justify-center items-center px-4 py-3 md:py-2">
          <RotatingWelcome/>
        </div>
    );
}