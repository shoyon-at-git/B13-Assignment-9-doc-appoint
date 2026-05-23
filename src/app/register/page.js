"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Button,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const user = Object.fromEntries(formData.entries());

        console.log(user);

        const{data, error:signUpError} = await authClient.signUp.email({
            email:user.email,
            name:user.name,
            image:user.image || undefined,
            password:user.password,
        })
        console.log({data,signUpError});
        if(data){
            redirect("/login")
        }
        if(signUpError){
            toast.error(signUpError.message)
        }
    };

    const handleSocialSignup = async () => {
        
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-base-200 px-4">
            <div className="w-full max-w-md rounded-2xl bg-base-100 p-8 shadow-xl">
                <h1 className="mb-8 text-center text-4xl font-bold">
                    Create new account
                </h1>

                <Form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-5"
                >
                    <TextField isRequired name="name">
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                    </TextField>

                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                                    value
                                )
                            ) {
                                return "Please enter a valid email";
                            }

                            return null;
                        }}
                    >
                        <Label>Email</Label>

                        <Input placeholder="john@example.com" />

                        <FieldError />
                    </TextField>

                    <TextField name="image" type="url">
                        <Label>Photo URL</Label>

                        <Input placeholder="https://example.com/photo.jpg" />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (!value || value.length < 6) {
                                return "Password must be at least 6 characters";
                            }

                            if (!/[A-Z]/.test(value)) {
                                return "Must contain at least 1 uppercase letter";
                            }

                            if (!/[a-z]/.test(value)) {
                                return "Must contain at least 1 lowercase letter";
                            }

                            return null;
                        }}
                    >
                        <Label>Password</Label>

                        <Input placeholder="Enter your password" />

                        <FieldError />
                    </TextField>

                    {error && (
                        <p className="text-sm font-medium text-red-500">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-black text-white"
                    >
                        Register
                    </Button>
                </Form>

                <div className="my-6 flex items-center gap-3">
                    <div className="h-px flex-1 bg-gray-300"></div>

                    <p className="text-sm text-gray-500">OR</p>

                    <div className="h-px flex-1 bg-gray-300"></div>
                </div>

                <Button
                    onClick={handleSocialSignup}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 font-medium text-gray-800 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
                >
                    <FaGoogle className="text-xl text-red-500" />

                    <span>Continue with Google</span>
                </Button>

                <p className="mt-6 text-center text-sm">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;