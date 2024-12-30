"use client";

import {useState, useRef, useCallback} from "react";
import Link from "next/link";
import Image from "next/image";
import {motion} from "framer-motion";
import {Menu, X, ChevronDown} from "lucide-react";
import  Sidebar  from "./landing-sidebar";
// Define types for menu and links
type MenuLink = {
    name: string;
    href: string;
};

type MenuCategory = {
    name: string;
    links: MenuLink[];
};

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
    const dropdownTimerRef = useRef<NodeJS.Timeout | null>(null);

    const menuCategories: MenuCategory[] = [
        {
            name: "Admission",
            links: [
                {name: "Full-Time Application", href: "/admission/application"},
                {name: "Scholarship", href: "/admission/scholarship"},
                {name: "Book a Tour", href: "/admission/scholarship"},
                {name: "Consultation", href: "/admission/consultation"},
            ],
        },
        {
            name: "International Student",
            links: [
                {name: "Visa Application", href: "/international/visa"},
                {name: "Homestay", href: "/international/homestay"},
                {name: "Study in Canada", href: "#"},
                {name: "Toronto & Surroundings", href: "#"},
            ],
        },
        {
            name: "Academic Program",
            links: [
                {name: "Secondary School", href: "/programs/secondary-school"},
                {name: "Tutoring", href: "#"},
                {name: "Counselling", href: "/programs/student-counseling"},
                {name: "Summer Camp", href: "/programs/summer-camp"},
                {name: "Leadership Program", href: "/programs/leadership"},
                {name: "Robotics and AI", href: "/programs/robotics-ai"},
            ],
        },
        {
            name: "Student Life",
            links: [
                {name: "Student Council", href: "/students/student-council"},
                {name: "Activity Schedule", href: "/students/activity-schedule"},
                {name: "Clubs", href: "/students/clubs"},
                // {name: "Volunteer Programs", href: "#"},
                {name: "Merit Education Charity Gala for UNICEF", href: "/students/mecgfu"},
            ],
        },

        {
            name: "Others",
            links: [
                {name: "About Merit College", href: "/menu/about"},
                {name: "AP Course", href: "/menu/ap-course"},
                {name: "AP Prep", href: "/menu/ap-prep"},
                {name: "Tech School", href: "#"},
                {name: "Student Life", href: "#"},
                {name: "Learning", href: "#"},
                {name: "E-School", href: "/menu/e-school"},

            ],
        },
    ];

    const handleMouseEnter = useCallback((menu: string) => {
        // Clear any existing timer
        if (dropdownTimerRef.current) {
            clearTimeout(dropdownTimerRef.current);
        }
        // Open dropdown immediately
        setDropdownOpen(menu);
    }, []);

    const handleMouseLeave = useCallback(() => {
        // Add a delay before closing the dropdown
        dropdownTimerRef.current = setTimeout(() => {
            setDropdownOpen(null);
        }, 400); // 300ms delay
    }, []);

    const handleDropdownMouseEnter = useCallback(() => {
        // Clear the timer if mouse enters the dropdown
        if (dropdownTimerRef.current) {
            clearTimeout(dropdownTimerRef.current);
        }
    }, []);

    return (
        <header className="bg-green-shade text-white shadow-md flex items-center">
            <div className="container mx-auto flex justify-between items-center p-6 ">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <Image
                        src="/logo-2.webp"
                        alt="Merit College Logo"
                        width={220}
                        height={220}
                        priority
                    />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex items-center space-x-6">
                    {menuCategories.map((menu) => (
                        <div
                            key={menu.name}
                            className="relative group"
                            onMouseEnter={() => handleMouseEnter(menu.name)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <button
                                className="hover:text-green-600 transition-colors duration-200"
                            >
                                <div className="flex items-center space-x-2">
                                    {menu.name}
                                    <ChevronDown/>
                                </div>

                            </button>
                            {dropdownOpen === menu.name && (
                                <motion.div
                                    initial={{opacity: 0, y: -10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -10}}
                                    onMouseEnter={handleDropdownMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    className="absolute top-full left-0 mt-2 bg-white text-black rounded-lg shadow-lg p-4 space-y-2 min-w-[200px] z-50"
                                >
                                    {menu.links.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="block py-2 hover:text-green-600 hover:bg-green-50 px-2 rounded-md transition-colors duration-200"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}

                    <Link
                        href="#"
                        className="bg-black px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                        Login
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-white"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                >
                    {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                </button>
            </div>

            {/* Mobile Menu (unchanged) */}
            {menuOpen && (
                <motion.div
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    className="lg:hidden bg-green-800 text-white"
                >
                    <div className="flex flex-col space-y-4 p-4">
                        {menuCategories.map((menu) => (
                            <div key={menu.name} className="relative">
                                <button
                                    onClick={() => setDropdownOpen(dropdownOpen === menu.name ? null : menu.name)}
                                    className="block w-full text-left hover:text-green-300 transition-colors duration-200"
                                >
                                    {menu.name}
                                </button>
                                {dropdownOpen === menu.name && (
                                    <div className="pl-4 mt-2 space-y-2">
                                        {menu.links.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="block py-2 hover:text-green-500 hover:bg-green-700 px-2 rounded-md transition-colors duration-200"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        <Link
                            href="/admin-panel"
                            className="bg-black px-6 py-2 rounded-lg text-center hover:bg-gray-800 transition-colors duration-200"
                        >
                            Login
                        </Link>
                    </div>
                </motion.div>
            )}
            <Sidebar/>
        </header>
    );
};

export default Header; 