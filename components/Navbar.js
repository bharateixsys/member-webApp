import { useRouter } from "next/router";
import Link from "next/link";
import { Menu } from "@progress/kendo-react-layout";
import { useState } from "react";
import {
    FaSearch,
    FaBell,
    FaUserCircle,
    FaBars,
    FaTimes,
} from "react-icons/fa";
import React from "react";

export default function Navbar() {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("Residents");
    const [openDropdown, setOpenDropdown] = useState(null);

    // 🔹 Language State
    const [language, setLanguage] = useState("en");
    const toggleLanguage = () => {
        setLanguage(language === "en" ? "es" : "en");
    };

    // 🔹 User Menu (Profile / Logout)
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const handleLogout = () => {
        // clear tokens or session here if you store them
        localStorage.clear();
        sessionStorage.clear();
        router.push("/login");
    };

    const menuItems = [
        {
            name: language === "en" ? "My Benefits" : "Mis Beneficios",
            children: [
                { name: language === "en" ? "Plan Detail" : "Detalle del Plan", path: "/benefit/plandetail" },
                { name: language === "en" ? "Plan Info" : "Información del Plan", path: "https://senderohealth.com/members/", target: "_blank" },
            ],
        },
        { name: language === "en" ? "My Claims" : "Mis Reclamos", path: "/claim/claimall" },
        {
            name: language === "en" ? "Tools & Resources" : "Herramientas y Recursos",
            children: [
                { name: language === "en" ? "Find Provider" : "Buscar Proveedor", path: "https://senderohealth.com/find-a-doctor/", target: "_blank" },
                { name: language === "en" ? "Find Pharmacy" : "Buscar Farmacia", path: "https://senderohealth.com/pharmacy-search/", target: "_blank" },
                { name: "ID Card", path: "/tool/idcard" },
                { name: language === "en" ? "Formulary Lookup" : "Búsqueda de Formulario", path: "https://senderohealth.com/find-a-doctor/", target: "_blank" },
                { name: "PCP", path: "/tool/pcp" },
                { name: "check", path: "/tool/check" },
                { name: "check1", path: "/tool/check1" },
            ],
        },
        {
            name: language === "en" ? "Pages" : "Páginas",
            children: [
                { name: language === "en" ? "Login" : "Iniciar Sesión", path: "/login" },
                { name: language === "en" ? "Registration" : "Registro", path: "/registration" },
                { name: language === "en" ? "Forgot Password" : "Olvidé mi Contraseña", path: "/forgot-password" },
            ],
        },
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <img
                        src="https://msen.azurewebsites.net/assets/images/logo.png"
                        alt="Logo"
                        className="h-10 w-10 rounded-full"
                    />
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
                    {menuItems.map((item) =>
                        item.children ? (
                            <div key={item.name} className="relative">
                                <button
                                    onClick={() =>
                                        setOpenDropdown(openDropdown === item.name ? null : item.name)
                                    }
                                    className="cursor-pointer hover:text-blue-600"
                                >
                                    {item.name}
                                </button>

                                {openDropdown === item.name && (
                                    <div className="absolute left-0 mt-2 min-w-[180px] flex flex-col rounded-lg bg-white shadow-lg z-50">
                                        {item.children.map((child) =>
                                            child.path.startsWith("http") ? (
                                                <a
                                                    key={child.name}
                                                    href={child.path}
                                                    target={child.target || "_blank"}
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    {child.name}
                                                </a>
                                            ) : (
                                                <Link
                                                    key={child.name}
                                                    href={child.path}
                                                    className="px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                                                >
                                                    {child.name}
                                                </Link>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                key={item.name}
                                href={item.path}
                                className="hover:text-blue-600"
                            >
                                {item.name}
                            </Link>
                        )
                    )}
                </nav>

                {/* Right Section */}
                <div className="flex items-center gap-4 relative">
                    {/* 🔹 Language Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className="px-3 py-1 text-sm rounded-lg border border-slate-300 hover:bg-blue-50"
                    >
                        {language === "en" ? "Spanish" : "English"}
                    </button>

                    <FaBell className="text-slate-500 text-lg cursor-pointer hidden sm:block" />

                    {/* 🔹 User Menu */}
                    <div className="relative hidden sm:block">
                        <button
                            onClick={() => setUserMenuOpen(!userMenuOpen)}
                            className="flex items-center"
                        >
                            <FaUserCircle className="text-3xl text-slate-600 cursor-pointer" />
                        </button>

                        {userMenuOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                                <button
                                    onClick={() => router.push("/editprofile")}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                                >
                                    {language === "en" ? "Profile" : "Perfil"}
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm hover:bg-blue-50"
                                >
                                    {language === "en" ? "Logout" : "Cerrar Sesión"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden text-2xl text-slate-600"
                        onClick={() => setMobileOpen(true)}
                    >
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Sidebar (Mobile) */}
            {mobileOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex">
                    <div
                        className="fixed inset-0 bg-black bg-opacity-40"
                        onClick={() => setMobileOpen(false)}
                    ></div>

                    <div className="relative ml-auto w-72 bg-white h-full shadow-xl p-6 flex flex-col">
                        <button
                            className="absolute top-4 right-4 text-2xl text-slate-600"
                            onClick={() => setMobileOpen(false)}
                        >
                            <FaTimes />
                        </button>

                        {/* Nav Items */}
                        <nav className="mt-10 flex flex-col gap-4 text-base font-medium text-slate-600">
                            {menuItems.map((item, idx) =>
                                item.children ? (
                                    <details key={idx} className="group">
                                        <summary className="cursor-pointer py-2 hover:text-blue-600">
                                            {item.name}
                                        </summary>
                                        <div className="pl-4 flex flex-col gap-2">
                                            {item.children.map((child) =>
                                                child.path.startsWith("http") ? (
                                                    <a
                                                        key={child.name}
                                                        href={child.path}
                                                        target={child.target || "_blank"}
                                                        rel="noopener noreferrer"
                                                        className="py-1 hover:text-blue-600"
                                                    >
                                                        {child.name}
                                                    </a>
                                                ) : (
                                                    <Link
                                                        key={child.name}
                                                        href={child.path}
                                                        className="py-1 hover:text-blue-600"
                                                    >
                                                        {child.name}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </details>
                                ) : (
                                    <Link
                                        key={item.name}
                                        href={item.path}
                                        className="py-2 hover:text-blue-600"
                                    >
                                        {item.name}
                                    </Link>
                                )
                            )}
                        </nav>

                        <hr className="my-6" />

                        {/* 🔹 Language Toggle in Mobile */}
                        <button
                            onClick={toggleLanguage}
                            className="mb-4 px-3 py-2 text-sm rounded-lg border border-slate-300 hover:bg-blue-50"
                        >
                            {language === "en" ? "Español" : "English"}
                        </button>

                        {/* 🔹 Profile & Logout in Mobile */}
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => router.push("/editprofile")}
                                className="w-full text-left px-3 py-2 rounded hover:bg-blue-50"
                            >
                                {language === "en" ? "Profile" : "Perfil"}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-3 py-2 rounded hover:bg-blue-50"
                            >
                                {language === "en" ? "Logout" : "Cerrar Sesión"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}
