"use client";

import { Envelope } from "@gravity-ui/icons";
import { Button, FieldError, Input, Label, ListBox, Modal, Surface, TextField, Select, TextArea } from "@heroui/react";
import { Edit } from "lucide-react";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export function EditModal({ car }) {

  const { capacity, carType, company, description, fuelType, imageUrl, location, model, price, transmission, _id } = car;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const carData = Object.fromEntries(formData.entries());

    // console.log(carData);

    const res = await fetch(`http://localhost:8000/cars/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(carData),
    });

    const data = await res.json();

    console.log(data);

    if (res.ok) {
      toast.success('Car Edited successfully!');
      redirect('/explore-cars')
      // e.target.reset();
    } else {
      toast.error('Failed to add info!');
    }
  };

  return (

    <Modal>
      <Toaster></Toaster>
      <Button variant="outline" className={'rounded-none text-white'}><Edit></Edit> Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-sm md:max-w-lg lg:max-w-3xl bg-slate-800">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Heading className="text-white text-center text-2xl font-bold">Edit Info</Modal.Heading>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">

                <form onSubmit={handleSubmit} className="space-y-8 bg-slate-800">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">

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
                    <TextField defaultValue={price} name="price" type="number" isRequired>
                      <Label className="text-slate-200 font-medium mb-2 block">Rent Price per Day ($BDT)</Label>
                      <Input
                        type="number"
                        placeholder="e.g. 5000"
                        className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:border-cyan-500 w-full"
                      />
                      <FieldError className="text-red-400 text-sm mt-1" />
                    </TextField>

                    {/* Status (Dropdown) */}
                    <div>
                      <Select name="status" isRequired className="w-full text-white" placeholder="Select Status">
                        <Label className="text-slate-200 font-medium mb-2 block">Status</Label>
                        <Select.Trigger className="rounded-2xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-700/50">
                          <Select.Value />
                          <Select.Indicator />
                        </Select.Trigger>
                        <Select.Popover className="bg-slate-800 border border-slate-700 text-slate-100 rounded-xl shadow-xl">
                          <ListBox>
                            <ListBox.Item id="Available" textValue="Available" className="hover:bg-slate-700 text-slate-200">Available</ListBox.Item>
                            <ListBox.Item id="Unavailable" textValue="Unavailable" className="hover:bg-slate-700 text-slate-200">Unavailable</ListBox.Item>
                          </ListBox>
                        </Select.Popover>
                      </Select>
                    </div>

                    {/* Pick-up Location */}
                    <div className="md:col-span-2">
                      <TextField defaultValue={location} name="location" isRequired>
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
                      <TextField defaultValue={imageUrl} name="imageUrl" isRequired>
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
                      <TextField defaultValue={description} name="description" isRequired>
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
                  <Modal.Footer>
                    <Button
                      type="submit"
                      className="rounded-2xl w-full bg-[#8a0e37] hover:bg-[#bd2a5b] text-white font-bold py-4 transition-all duration-200 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                    >
                      Update Info
                    </Button>
                  </Modal.Footer>

                </form>
              </Surface>
            </Modal.Body>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}