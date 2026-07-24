"use client"

import { Button, DateField, FieldError, Form, Label, ListBox, TextArea, TextField, Select, Card } from "@heroui/react";

const BookingForm = ({ car }) => {
  const { capacity, carType, company, description, fuelType, imageUrl, location, model, price, transmission, _id, status } = car;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Form Data:", data);
  };

  return (

    <Card className="bg-slate-950">
      <Form onSubmit={handleSubmit} className="space-y-5">

        {/* card info */}
        <input type="hidden" name="_id" value={_id} />
        <input type="hidden" name="model" value={model} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="imageUrl" value={imageUrl} />

        {/* Date Field */}
        <DateField isRequired className="w-full" name="date">
          <Label className="text-slate-200 font-medium mb-2 block">Booking Date</Label>
          <DateField.Group>
            <DateField.Input className="bg-slate-900 border border-slate-700 text-white rounded-xl p-2 w-full">
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
          </DateField.Group>
          <FieldError className="text-red-400 text-sm mt-1" />
        </DateField>

        {/* Driver Requirement */}
        <Select name="driver" isRequired className="w-full text-white" placeholder="Select Status">
          <Label className="text-slate-200 font-medium mb-2 block">Driver Needed?</Label>
          <Select.Trigger className="rounded-2xl bg-slate-900 border border-slate-700 text-white hover:bg-slate-700/50 w-full p-2 flex justify-between items-center">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover className="bg-slate-800 border border-slate-700 text-slate-100 rounded-xl shadow-xl p-2">
            <ListBox>
              <ListBox.Item id="yes" textValue="Yes" className="hover:bg-slate-700 text-slate-200 p-2 rounded cursor-pointer">
                Yes
              </ListBox.Item>
              <ListBox.Item id="no" textValue="No" className="hover:bg-slate-700 text-slate-200 p-2 rounded cursor-pointer">
                No
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError className="text-red-400 text-sm mt-1" />
        </Select>

        {/* Special Note */}
        <TextField name="note">
          <Label className="text-slate-200 font-medium mb-2 block">Special Note</Label>
          <TextArea
            placeholder="Write your special note"
            className="rounded-2xl bg-slate-900 border border-slate-700 text-white placeholder-gray-500 focus:border-cyan-500 w-full min-h-[100px] p-3"
          />
          <FieldError className="text-red-400 text-sm mt-1" />
        </TextField>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-[#8a0e37] hover:bg-[#a01142] text-white font-semibold py-3 px-4 sm:py-3.5 sm:px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-[#8a0e37]/30 flex items-center justify-center gap-2 text-sm sm:text-base">
          Rent Now
        </Button>
      </Form>
    </Card>
  );
}

export default BookingForm;