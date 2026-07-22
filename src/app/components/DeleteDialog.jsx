"use client";

import { TrashBin } from "@gravity-ui/icons";
import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export function DeleteDialog({car}) {

  const { _id, model} = car;

  const handleDelete = async () => {
    const res = await fetch(`http://localhost:8000/cars/${_id}`,
      {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        }
      })
    const data = await res.json()
    console.log(data)
    // toast
    toast.success('Deleted')
    redirect('/explore-cars')
  }

  return (
    <AlertDialog>
      <Button variant="outline" className={'text-red-500 rounded-none'}><TrashBin></TrashBin> Delete</Button>
      <AlertDialog.Backdrop>
        <Toaster></Toaster>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px] bg-slate-800">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading className="text-white font-bold">Delete info permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p className="text-white">
                This will permanently delete <strong>{model}</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}