"use client";

import { AlertDialog, Button } from "@heroui/react";

export function BookingCancelAlert({bookingId}) {
  console.log(bookingId);

  const handleCancelBooking = async () => {
    const res = await fetch(`http://localhost:8000/booking/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type" : "application/json"
      }
    })

    const data = await res.json();
    window.location.reload();
    
  }
  return (
    <AlertDialog>
      <AlertDialog.Trigger>
      <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer">
        Cancel
      </button>
      </AlertDialog.Trigger>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-slate-800">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-white font-bold">Cancel Booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-white">
                This will permanently Cancel <strong>this booking</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Go Back
              </Button>
              <Button onClick={handleCancelBooking} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}