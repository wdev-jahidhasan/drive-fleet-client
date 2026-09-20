"use client"
import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const SignUpPage = () => {
  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.imageUrl || undefined,
    })

    if (data) {
      toast.success('Signed up successfully')
      redirect('/login')
    }

    if (error) {
      toast.error(error.message)
    }
  };

  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    })
  };

  return (
    <div className='min-h-screen bg-slate-950 flex flex-col items-center justify-center py-10 px-4'>
      <Card className='bg-slate-900 border border-slate-800 p-6 md:p-8 shadow-xl rounded-2xl w-full max-w-md'>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Create an account</h1>
          <p className="text-slate-400 text-sm mt-1">Register your DriveFleet account</p>
        </div>

        {/* Signup Form */}
        <Form onSubmit={handleSignUp} className="flex flex-col gap-4">
          {/* Name Field */}
          <TextField isRequired name="name">
            <Label className='text-slate-300 text-sm font-medium'>Name</Label>
            <Input
              placeholder="John Doe"
              className='bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 rounded-lg'
            />
            <FieldError className='text-rose-400 text-xs mt-1' />
          </TextField>

          {/* Image url */}
          <TextField name="imageUrl">
            <Label className='text-slate-300 text-sm font-medium'>Image URL (Optional)</Label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              className='bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 rounded-lg'
            />
            <FieldError className='text-rose-400 text-xs mt-1' />
          </TextField>

          {/* Email */}
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className='text-slate-300 text-sm font-medium'>Email</Label>
            <Input
              placeholder="john@example.com"
              className='bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 rounded-lg'
            />
            <FieldError className='text-rose-400 text-xs mt-1' />
          </TextField>

          {/* Password */}
          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className='text-slate-300 text-sm font-medium'>Password</Label>
            <Input
              placeholder="Enter your password"
              className='bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:border-cyan-500 rounded-lg'
            />
            <Description className='text-slate-400 text-xs mt-1'>
              Must be at least 6 chars with 1 uppercase & 1 lowercase
            </Description>
            <FieldError className='text-rose-400 text-xs mt-1' />
          </TextField>

          <Button type="submit" className='w-full mt-2 bg-[#8a0e37] hover:bg-[#bd2a5b] text-white font-medium py-2.5 rounded-lg transition-all shadow-md'>
            Sign Up
          </Button>
        </Form>

        {/* Divider */}
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase">Or</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {/* Google Sign In */}
        <Button
          onClick={handleGoogleSignIn}
          className='w-full bg-slate-950 border border-slate-700 text-slate-200 hover:bg-slate-800 hover:text-white font-medium py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 mb-6'
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </Button>

        {/* Login Link Inside Same Plate */}
        <div className="pt-4 border-t border-slate-800 text-center flex items-center justify-center gap-2 text-sm">
          <span className='text-slate-400'>Already have an account?</span>
          <Link href={'/login'} className='text-amber-400 font-semibold hover:underline'>
            Login
          </Link>
        </div>

      </Card>
    </div>
  );
};

export default SignUpPage;