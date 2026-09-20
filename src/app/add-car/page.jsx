'use client';

import { authClient } from '@/lib/auth-client';
import { Button, FieldError, Input, Label, ListBox, TextArea, TextField, Select } from '@heroui/react';
import { redirect } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

const AddCar = () => {

  const {
    data: session,
  } = authClient.useSession()
  const user = session?.user

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData.entries());

    const { data: tokenData } = await authClient.token()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/cars`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(carData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success('Car added successfully!');
      e.target.reset();
      redirect('/explore-cars')
    } else {
      toast.error('Failed to add car!');
    }
  };

  return (
    <div className='bg-slate-950 min-h-screen'>
      <Toaster></Toaster>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="bg-slate-900 text-slate-100 rounded-3xl shadow-2xl p-6 sm:p-10 border border-slate-800">

          {/* Header Section */}
          <div className="text-center sm:text-left mb-8 pb-6 border-b border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Add New Car Listing
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Fill in the vehicle details below to publish a new car for rent.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* hidden */}
              <input type="hidden" name="userId" value={user?.id || ""} />

              {/* Car Model */}
              <div className="md:col-span-2">
                <TextField name="model" isRequired>
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Car Model</Label>
                  <Input
                    placeholder="Enter Car Model (e.g. Toyota Premio G-Superior)"
                    className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full p-3"
                  />
                  <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
                </TextField>
              </div>

              {/* Brand / Company */}
              <TextField name="company" isRequired>
                <Label className="text-slate-200 text-sm font-semibold mb-2 block">Brand / Company</Label>
                <Input
                  placeholder="Enter Brand Name (e.g. Toyota)"
                  className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full p-3"
                />
                <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
              </TextField>

              {/* Car Type (Dropdown) */}
              <div>
                <Select
                  name="carType"
                  isRequired
                  className="w-full text-white"
                  placeholder="Select Car Type"
                >
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Car Type</Label>
                  <Select.Trigger className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 hover:bg-slate-800 p-3 flex justify-between items-center w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-slate-900 border border-slate-700 text-slate-100 rounded-xl shadow-xl p-1">
                    <ListBox>
                      <ListBox.Item id="Sedan" textValue="Sedan" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Sedan</ListBox.Item>
                      <ListBox.Item id="SUV" textValue="SUV" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">SUV</ListBox.Item>
                      <ListBox.Item id="Hatchback" textValue="Hatchback" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Hatchback</ListBox.Item>
                      <ListBox.Item id="Luxury" textValue="Luxury" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Luxury</ListBox.Item>
                      <ListBox.Item id="Electric" textValue="Electric" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Electric</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Price per Day */}
              <TextField name="price" type="number" isRequired>
                <Label className="text-slate-200 text-sm font-semibold mb-2 block">Rent Price per Day (BDT)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 5000"
                  className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full p-3"
                />
                <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
              </TextField>

              {/* Seating Capacity */}
              <TextField name="capacity" type="number" isRequired>
                <Label className="text-slate-200 text-sm font-semibold mb-2 block">Seating Capacity</Label>
                <Input
                  type="number"
                  placeholder="e.g. 4, 5, 7"
                  className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full p-3"
                />
                <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
              </TextField>

              {/* Fuel Type (Dropdown) */}
              <div>
                <Select name="fuelType" isRequired className="w-full text-white" placeholder="Select Fuel Type">
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Fuel Type</Label>
                  <Select.Trigger className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 hover:bg-slate-800 p-3 flex justify-between items-center w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-slate-900 border border-slate-700 text-slate-100 rounded-xl shadow-xl p-1">
                    <ListBox>
                      <ListBox.Item id="Petrol" textValue="Petrol" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Petrol</ListBox.Item>
                      <ListBox.Item id="Diesel" textValue="Diesel" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Diesel</ListBox.Item>
                      <ListBox.Item id="Electric" textValue="Electric" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Electric</ListBox.Item>
                      <ListBox.Item id="Hybrid" textValue="Hybrid" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Hybrid</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Transmission (Dropdown) */}
              <div>
                <Select name="transmission" isRequired className="w-full text-white" placeholder="Select Transmission">
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Transmission</Label>
                  <Select.Trigger className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 hover:bg-slate-800 p-3 flex justify-between items-center w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-slate-900 border border-slate-700 text-slate-100 rounded-xl shadow-xl p-1">
                    <ListBox>
                      <ListBox.Item id="Automatic" textValue="Automatic" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Automatic</ListBox.Item>
                      <ListBox.Item id="Manual" textValue="Manual" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Manual</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Status (Dropdown) */}
              <div className="md:col-span-2">
                <Select name="status" isRequired className="w-full text-white" placeholder="Select Status">
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Status</Label>
                  <Select.Trigger className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 hover:bg-slate-800 p-3 flex justify-between items-center w-full">
                    <Select.Value />
                    <Select.Indicator />
                  </Select.Trigger>
                  <Select.Popover className="bg-slate-900 border border-slate-700 text-slate-100 rounded-xl shadow-xl p-1">
                    <ListBox>
                      <ListBox.Item id="Available" textValue="Available" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Available</ListBox.Item>
                      <ListBox.Item id="Unavailable" textValue="Unavailable" className="hover:bg-slate-800 text-slate-200 p-2 rounded-lg cursor-pointer">Unavailable</ListBox.Item>
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              {/* Pick-up Location */}
              <div className="md:col-span-2">
                <TextField name="location" isRequired>
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Location / City</Label>
                  <Input
                    placeholder="Write Pickup Location (e.g. Gulshan, Dhaka)"
                    className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full p-3"
                  />
                  <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
                </TextField>
              </div>

              {/* Image URL */}
              <div className="md:col-span-2">
                <TextField name="imageUrl" isRequired>
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Car Image URL</Label>
                  <Input
                    type="url"
                    placeholder="https://example.com/car-image.jpg"
                    className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full p-3"
                  />
                  <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
                </TextField>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextField name="description" isRequired>
                  <Label className="text-slate-200 text-sm font-semibold mb-2 block">Description & Features</Label>
                  <TextArea
                    placeholder="Mention key features, condition, AC status, etc..."
                    className="rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-400 focus:border-cyan-400 w-full min-h-[120px] p-3"
                  />
                  <FieldError className="text-rose-400 text-xs mt-1 font-medium" />
                </TextField>
              </div>

            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="rounded-xl w-full bg-[#8a0e37] hover:bg-[#bd2a5b] text-white font-semibold py-3.5 transition-all duration-200 shadow-md text-base"
              >
                Add Car Listing
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;