import React from "react";
import {
    Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function NavList() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography as="li" variant="small" color="blue-gray" className="p-1 font-medium">
                <Link to="/login" className="flex items-center hover:text-gray-600 hover:underline transition-colors">
                    Login
                </Link>
            </Typography>
        </ul>
    );
}