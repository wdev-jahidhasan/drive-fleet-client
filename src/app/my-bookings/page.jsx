import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
})
const user = session?.user;
console.log(user);
  const res = await fetch(`http://localhost:8000/booking/${user.id}`);
  const data = await res.json()
  console.log(data);
  return (
    <div className='max-w-7xl mx-auto'>
      <h1 className='text-3xl font-bold'>My Bookings</h1>
    </div>
  );
};

export default MyBookingPage;