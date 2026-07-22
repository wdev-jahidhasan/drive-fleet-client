'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';

const AddCar = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Car added successfully!');
        e.target.reset();
      } else {
        alert(result.message || 'Failed to add car!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className='bg-slate-800'>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="bg-slate-800 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-700">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-white text-center sm:text-left">
          Add New Car Listing
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Car Model */}
            <div className="md:col-span-2">
              <TextField name="model" isRequired>
                <Label className="text-slate-200 font-medium mb-2 block">Car Model</Label>
                <Input 
                  placeholder="Enter Car Model" 
                  className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full" 
                />
                <FieldError className="text-red-400 text-sm mt-1" />
              </TextField>
            </div>

            {/* Brand / Company */}
            <TextField name="company" isRequired>
              <Label className="text-slate-200 font-medium mb-2 block">Brand / Company</Label>
              <Input 
                placeholder="Enter Brand Name" 
                className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full" 
              />
              <FieldError className="text-red-400 text-sm mt-1" />
            </TextField>

            {/* Car Type (Dropdown) */}
            <div>
              <Select
                name="carType"
                isRequired
                className="w-full text-white"
                placeholder="Select Car Type"
              >
                <Label className="text-slate-200 font-medium mb-2 block">Car Type</Label>
                <Select.Trigger className="rounded-2xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-700/50">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-slate-800 border border-slate-700 text-slate-100 rounded-xl shadow-xl">
                  <ListBox>
                    <ListBox.Item id="Sedan" textValue="Sedan" className="hover:bg-slate-700 text-slate-200">Sedan</ListBox.Item>
                    <ListBox.Item id="SUV" textValue="SUV" className="hover:bg-slate-700 text-slate-200">SUV</ListBox.Item>
                    <ListBox.Item id="Hatchback" textValue="Hatchback" className="hover:bg-slate-700 text-slate-200">Hatchback</ListBox.Item>
                    <ListBox.Item id="Luxury" textValue="Luxury" className="hover:bg-slate-700 text-slate-200">Luxury</ListBox.Item>
                    <ListBox.Item id="Electric" textValue="Electric" className="hover:bg-slate-700 text-slate-200">Electric</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Price per Day */}
            <TextField name="price" type="number" isRequired>
              <Label className="text-slate-200 font-medium mb-2 block">Rent Price per Day ($BDT)</Label>
              <Input 
                type="number" 
                placeholder="e.g. 5000" 
                className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full" 
              />
              <FieldError className="text-red-400 text-sm mt-1" />
            </TextField>

            {/* Seating Capacity */}
            <TextField name="capacity" type="number" isRequired>
              <Label className="text-slate-200 font-medium mb-2 block">Seating Capacity</Label>
              <Input 
                type="number" 
                placeholder="e.g. 4, 5, 7" 
                className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full" 
              />
              <FieldError className="text-red-400 text-sm mt-1" />
            </TextField>

            {/* Fuel Type (Dropdown) */}
            <div>
              <Select name="fuelType" isRequired className="w-full text-white" placeholder="Select Fuel Type">
                <Label className="text-slate-200 font-medium mb-2 block">Fuel Type</Label>
                <Select.Trigger className="rounded-2xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-700/50">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-slate-800 border border-slate-700 text-slate-100 rounded-xl shadow-xl">
                  <ListBox>
                    <ListBox.Item id="Petrol" textValue="Petrol" className="hover:bg-slate-700 text-slate-200">Petrol</ListBox.Item>
                    <ListBox.Item id="Diesel" textValue="Diesel" className="hover:bg-slate-700 text-slate-200">Diesel</ListBox.Item>
                    <ListBox.Item id="Electric" textValue="Electric" className="hover:bg-slate-700 text-slate-200">Electric</ListBox.Item>
                    <ListBox.Item id="Hybrid" textValue="Hybrid" className="hover:bg-slate-700 text-slate-200">Hybrid</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Transmission (Dropdown) */}
            <div>
              <Select name="transmission" isRequired className="w-full text-white" placeholder="Select Transmission">
                <Label className="text-slate-200 font-medium mb-2 block">Transmission</Label>
                <Select.Trigger className="rounded-2xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-700/50">
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover className="bg-slate-800 border border-slate-700 text-slate-100 rounded-xl shadow-xl">
                  <ListBox>
                    <ListBox.Item id="Automatic" textValue="Automatic" className="hover:bg-slate-700 text-slate-200">Automatic</ListBox.Item>
                    <ListBox.Item id="Manual" textValue="Manual" className="hover:bg-slate-700 text-slate-200">Manual</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* Pick-up Location */}
            <div className="md:col-span-2">
              <TextField name="location" isRequired>
                <Label className="text-slate-200 font-medium mb-2 block">Location / City</Label>
                <Input 
                  placeholder="Write Pickup Location" 
                  className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full" 
                />
                <FieldError className="text-red-400 text-sm mt-1" />
              </TextField>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2">
              <TextField name="imageUrl" isRequired>
                <Label className="text-slate-200 font-medium mb-2 block">Car Image URL</Label>
                <Input 
                  type="url" 
                  placeholder="https://example.com/car-image.jpg" 
                  className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full" 
                />
                <FieldError className="text-red-400 text-sm mt-1" />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="text-slate-200 font-medium mb-2 block">Description & Features</Label>
                <TextArea 
                  placeholder="Mention key features..." 
                  className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full min-h-[120px]" 
                />
                <FieldError className="text-red-400 text-sm mt-1" />
              </TextField>
            </div>

          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            className="rounded-2xl w-full bg-[#8a0e37] hover:bg-[#bd2a5b] text-white font-bold py-4 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
          >
            {isPending ? "Adding Car to Database..." : "Add Car Listing"}
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddCar;