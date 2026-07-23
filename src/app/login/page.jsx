"use client"
import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';

const LoginPage = () => {
  const handleSignIn = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
    })

    console.log({data, error});

    if (data) {
      toast.success('Signed up successfully')
      redirect('/')
    }

    if (error) {
      toast.error(error.message)
    }

  };

  return (
    <div className='bg-slate-900 py-5'>
      <Card className='bg-slate-800 max-w-7xl mx-auto'>
        <Form onSubmit={handleSignIn} className="flex w-80 md:w-96 flex-col gap-4 max-w-7xl mx-auto py-5">
          {/* email */}
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
            <Label className='text-white'>Email</Label>
            <Input placeholder="john@example.com" className={'bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500'} />
            <FieldError />
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
            <Label className='text-white'>Password</Label>
            <Input
              placeholder="Enter your password"
              className='bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500'
            />
            <Description className='text-white text-xs'>
              Must be at least 6 characters with 1 uppercase and 1 lowercase letter
            </Description>
            <FieldError />
          </TextField>

          <div className="flex gap-2">
            <Button type="submit" className={'w-full bg-[#8a0e37] hover:bg-[#bd2a5b]'}>
              Login
            </Button>
          </div>
        </Form>
      </Card>

      <Card className='flex flex-col items-center justify-center gap-5 mt-5 bg-slate-800 max-w-7xl mx-auto'>
        <Button className={'w-80 md:w-96 bg-[#8a0e37] hover:bg-[#bd2a5b]'}><FaGoogle></FaGoogle> Login with Google</Button>
        <p className='text-white font-bold'>Don't have an account?</p>
        <Link href={'/signup'}>
          <Button className={'w-80 md:w-96 bg-[#8a0e37] hover:bg-[#bd2a5b]'}>Register Your DriveFleet Account</Button>
        </Link>
      </Card>

    </div>
  );
};

export default LoginPage;