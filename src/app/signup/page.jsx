"use client"
import { authClient } from '@/lib/auth-client';
import { Button, Form, Input, Label, TextField, Description, FieldError, Card } from '@heroui/react';
import { redirect } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const handleSignUp = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const {data, error} = await authClient.signUp.email({
      email: user.email,
      password: user.password,
      name: user.name,
      image: user.imageUrl || undefined,
    })

    if(data){
      toast.success('Signed up successfully')
      redirect('/')
    }

    if(error){
      toast.error(error.message)
    }

  };
  return (
    <div className='bg-slate-900 flex items-center justify-center'>
      <Card className='bg-slate-800 w-full max-w-7xl mx-auto'>
        <Form onSubmit={handleSignUp} className="flex w-80 md:w-96 flex-col gap-4 max-w-7xl mx-auto py-5">
          
          {/* Name Field */}
          <TextField isRequired name="name">
            <Label className='text-white'>Name</Label>
            <Input 
              placeholder="John Doe" 
              className='bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500' 
            />
            <FieldError />
          </TextField>

          {/* Image url */}
          <TextField name="imageUrl">
            <Label className='text-white'>Image URL (Optional)</Label>
            <Input 
              placeholder="https://example.com/avatar.jpg" 
              className='bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500' 
            />
            <FieldError />
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
            <Label className='text-white'>Email</Label>
            <Input 
              placeholder="john@example.com" 
              className='bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500' 
            />
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

          <div className="flex gap-2 mt-2">
            <Button type="submit" className='w-full bg-[#8a0e37] hover:bg-[#bd2a5b] text-white'>
              Signup
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;