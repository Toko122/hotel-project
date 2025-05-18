import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./../assets/assets"
import { assets } from './../assets/assets'
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'hotels', path: '/hotels' },
        { name: 'Contact', path: '/contact' },
        { name: 'About', path: '/about' },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const {openSignIn} = useClerk()
    const {user} = useUser()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
            <img src={assets.logo} alt="logo" className={`h-9 ${isScrolled && "invert opacity-80"}`} />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {navLinks.map((link, i) => (
                <a key={i} href={link.path} className={`group flex flex-col text-[18px] gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
                    {link.name}
                    <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
                </a>
            ))}
            
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-6">
            <img src={assets.searchIcon} alt='search' className={`h-8 w-8 ${isScrolled ? "invert" : ""}`} />
            {
            user ? (
               <>
                 <UserButton></UserButton>
               </>
            ) : (
               <>
               <button onClick={openSignIn} className="cursor-pointer hover:bg-[#0f0f0f] bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                Login
            </button>
               </>
            )
         }
        </div>

        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
            <img onClick={()=>setIsMenuOpen(!isMenuOpen)} src={assets.menuIcon} alt='menu-icon' className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} />
        </div>

        {/* Mobile Menu */}
        <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            <img src={assets.closeIcon} alt='closeMenu' className="h-6.5" />
            </button>

            {navLinks.map((link, i) => (
                <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
                    {link.name}
                </a>
            ))}

{
            user ? (
               <>
                 <UserButton></UserButton>
               </>
            ) : (
               <>
               <button onClick={openSignIn} className="cursor-pointer hover:bg-[#0f0f0f] bg-black text-white px-8 py-2.5 rounded-full ml-4 transition-all duration-500">
                Login
            </button>
               </>
            )
         }
        </div>
    </nav>
    )
}

export default Navbar;
