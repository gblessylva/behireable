import { Link } from '@inertiajs/react';
import PrimaryButton from './PrimaryButton';
import { useState, useEffect } from 'react';

export default function NavigationMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuAnimation, setMenuAnimation] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setTimeout(() => setMenuAnimation(!menuAnimation), 50);
    };

    return (
        <nav className="absolute w-full flex justify-center">
            <div className="w-full md:w-1/2 flex flex-col md:flex-row items-center justify-between"
                style={{
                    'background': 'rgba(255, 255, 255, 0.45)',
                    'backdropFilter': 'blur(7.5px)',
                    'border': '1px solid rgba(181, 159, 59, 0.24)',
                    'padding': '0 15px',
                    'borderRadius': '16px',
                    'transition': 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    'transform': isMenuOpen ? 'scale(0.98)' : 'scale(1)',
                }}
            >
                {/* Top Bar - Always Visible */}
                <div className="w-full md:w-auto flex items-center justify-between h-[60px]">
                    <Link href="/">
                        <img 
                            height={'50px'}
                            width={'100px'}
                            src="assets/images/logos/beHirable.png" 
                            alt="beHired" 
                        />
                    </Link>

                    {/* Animated Menu Icon - Mobile Only */}
                    <button 
                        className="md:hidden z-50 flex flex-col items-center justify-center w-12 h-12 rounded-full 
                                 bg-[#355E3B] transition-all duration-300 hover:bg-[#918D0D]"
                        onClick={toggleMenu}
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 
                            ${isMenuOpen ? 'transform rotate-45 translate-y-1' : 'mb-1'}`}
                        />
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 
                            ${isMenuOpen ? 'opacity-0' : 'mb-1'}`}
                        />
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 
                            ${isMenuOpen ? 'transform -rotate-45 -translate-y-1' : ''}`}
                        />
                    </button>
                </div>

                {/* Mobile Menu Container */}
                <div className={`md:hidden fixed -right-2 top-16 z-index-45 -translate-x-1/2 bg-white/90 backdrop-blur-md
                    ${isMenuOpen ? 'top-4 -right-44 w-[95%] h-auto rounded-[24px]' : 'top-6 w-12 h-12 rounded-full'}
                    transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    overflow-hidden shadow-lg border border-gray-200/20`}
                    style={{
                        'transform': `translate(-50%, ${isMenuOpen ? '0' : '-120%'})`,
                    }}
                >
                    {/* Menu Content */}
                    <div className={`w-full h-full flex flex-col items-center gap-6 py-16
                        ${menuAnimation ? 'opacity-100 translate-y-10' : 'opacity-0 translate-y-4'}
                        transition-all duration-300 delay-20`}
                    >
                        <Link 
                            href='/' 
                            className="text-[#1b311e] hover:text-[#918D0D] transition-colors font-bold"
                        >
                            Products
                        </Link>
                        <Link 
                            href='/' 
                            className="text-[#1b311e] hover:text-[#918D0D] transition-colors font-bold"
                        >
                            Services
                        </Link>
                        <Link 
                            href=''
                            className="text-[#1b311e] hover:text-[#918D0D] transition-colors font-bold"
                        >
                            Contact
                        </Link>
                        <PrimaryButton 
                            className="bg-[#355E3B] hover:bg-[#918D0D] transition-colors"
                            onClick={() => window.location.href = route('login')}
                        >
                            TRY IT FREE
                        </PrimaryButton>
                    </div>
                </div>

                {/* Desktop Menu Items */}
                <div className="hidden md:flex items-center gap-8">
                    <Link 
                        href='/' 
                        className="text-[#1b311e] hover:text-[#918D0D] transition-colors font-bold"
                    >
                        Products
                    </Link>
                    <Link 
                        href='/' 
                        className="text-[#1b311e] hover:text-[#918D0D] transition-colors font-bold"
                    >
                        Services
                    </Link>
                    <Link 
                        href=''
                        className="text-[#1b311e] hover:text-[#918D0D] transition-colors font-bold"
                    >
                        Contact
                    </Link>
                </div>

                {/* Desktop Action Button */}
                <div className="hidden md:block">
                    <PrimaryButton 
                        className="bg-[#355E3B] hover:bg-[#918D0D] transition-colors"
                        onClick={() => window.location.href = route('login')}
                    >
                        TRY IT FREE
                    </PrimaryButton>
                </div>
            </div>
        </nav>
    );
}