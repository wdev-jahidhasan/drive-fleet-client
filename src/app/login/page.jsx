"use client"
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import { Check } from "lucide-react";
import React from 'react';

const LoginPage = () => {
  return (
    <div className='bg-slate-900 pb-6'>
      <Form className="flex w-80 md:w-96 flex-col gap-4 max-w-7xl mx-auto py-5">
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
          <Input placeholder="john@example.com" />
          <FieldError />
        </TextField>
        <TextField
          isRequired
          minLength={8}
          name="password"
          type="password"
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className='text-white'>Password</Label>
          <Input placeholder="Enter your password" />
          <Description className='text-white'>Must be at least 8 characters with 1 uppercase and 1 number</Description>
          <FieldError />
        </TextField>
        <div className="flex gap-2">
          <Button type="submit" className={'w-full'}>
            Submit
          </Button>
        </div>
      </Form>
      
      <div className='flex flex-col items-center justify-center gap-5'>
        <Button className={'w-80 md:w-96'}>Google Login Button</Button>
        <Button className={'w-80 md:w-96'}>Register Your Account</Button>
      </div>

    </div>
  );
};

export default LoginPage;