"use client";

import { authClient } from "@/lib/auth-client";
import { Button, DateField, FieldError, Form, Label, ListBox, TextArea, TextField, Select, Card } from "@heroui/react";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

const BookingForm = ({ car }) => {
  const { imageUrl, model, price, _id } = car;

  const {
    data: session,
  } = authClient.useSession()
  const user = session?.user

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("Form Data:", data);

    // client component ---------------------------------------
    const { data: tokenData } = await authClient.token()

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(data)
    })

    const finalData = await res.json()
    console.log(finalData);

    if (finalData) {
      toast.success('Booked Successfully')
      redirect('/my-bookings')
    }
  };

  return (
    <Card className="bg-slate-900 border border-slate-700 p-6 rounded-3xl shadow-xl">
      <h3 className="text-white font-extrabold text-lg sm:text-xl tracking-tight mb-5">
        Book This Vehicle
      </h3>

      <Form onSubmit={handleSubmit} className="space-y-5">

        {/* card info */}
        <input type="hidden" name="userId" value={user?.id || ""} />
        <input type="hidden" name="username" value={user?.name || ""} />
        <input type="hidden" name="carId" value={_id} />
        <input type="hidden" name="model" value={model} />
        <input type="hidden" name="price" value={price} />
        <input type="hidden" name="imageUrl" value={imageUrl} />

        {/* Date Field */}
        <DateField isRequired className="w-full" name="date">
          <Label className="text-slate-100 font-bold text-xs sm:text-sm mb-2 block">
            Booking Date
          </Label>
          <DateField.Group>
            <DateField.Input className="bg-slate-950 border-2 border-slate-500 data-[focused=true]:border-amber-400 data-[focused=true]:ring-0 text-white font-bold rounded-xl p-3 w-full text-sm outline-none shadow-none transition-colors">
              {(segment) => <DateField.Segment segment={segment} className="text-white font-bold px-0.5 focus:bg-amber-400/20 rounded" />}
            </DateField.Input>
          </DateField.Group>
          <FieldError className="text-red-400 text-sm mt-1" />
        </DateField>

        {/* Driver Requirement */}
        <Select name="driver" isRequired className="w-full text-white" placeholder="Select Status">
          <Label className="text-slate-100 font-bold text-xs sm:text-sm mb-2 block">
            Driver Needed?
          </Label>
          <Select.Trigger className="rounded-xl bg-slate-950 border-2 border-slate-500 data-[pressed=true]:border-amber-400 data-[open=true]:border-amber-400 data-[focused=true]:border-amber-400 text-white font-bold hover:bg-slate-900 w-full p-3 flex justify-between items-center text-sm outline-none shadow-none transition-colors">
            <Select.Value className="text-white font-bold" />
            <Select.Indicator className="text-white" />
          </Select.Trigger>
          <Select.Popover className="bg-slate-900 border-2 border-slate-600 text-white rounded-xl shadow-2xl p-2 z-50">
            <ListBox>
              <ListBox.Item id="yes" textValue="Yes" className="hover:bg-slate-800 text-white font-bold p-2.5 rounded-lg cursor-pointer">
                Yes (Professional Driver Included)
              </ListBox.Item>
              <ListBox.Item id="no" textValue="No" className="hover:bg-slate-800 text-white font-bold p-2.5 rounded-lg cursor-pointer">
                No (Self Drive)
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError className="text-red-400 text-sm mt-1" />
        </Select>

        {/* Special Note */}
        <TextField name="note" className="w-full">
          <Label className="text-slate-100 font-bold text-xs sm:text-sm mb-2 block">
            Special Note <span className="text-slate-300 font-normal">(Optional)</span>
          </Label>
          <TextArea
            placeholder="Write your special note here..."
            className="rounded-xl bg-slate-950 border-2 border-slate-500 text-white font-semibold placeholder-slate-300 focus:outline-none focus:border-amber-400 focus:ring-0 w-full min-h-[100px] p-3 text-sm resize-y shadow-none transition-colors"
          />
          <FieldError className="text-red-400 text-sm mt-1" />
        </TextField>

        {/* Submit Button */}
        <Button type="submit" className="w-full bg-[#8a0e37] hover:bg-[#a01142] active:scale-[0.99] text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-[#8a0e37]/20 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer">
          Rent Now
        </Button>
      </Form>
    </Card>
  );
}

export default BookingForm;