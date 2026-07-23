import Image from "next/image";
import Link from "next/link";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import FeaturedCars from "./components/FeaturedCars";

export default function Home() {
  return (
    <>
    <main>
      {/* Hero Section */}
      {/* <section className="relative overflow-hidden bg-slate-800"> */}
      <section className="relative overflow-hidden bg-[#0F3040]">

        {/* [#0F3040] */}


        {/* Background Blur */}
        <div className="absolute -top-1/2 -left-1/2 w-96 h-96 bg-[#0F3040] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[150px]"></div>

        {/* Grid */}
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-5 lg:py-28">
          <div className="grid lg:grid-cols-2 items-center gap-16">
            
            {/* Left */}
            <div className="order-2 lg:order-1 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="inline-block bg-teal-500/20 text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                🚘 Trusted Car Rental Platform
              </span>

              <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-200">
                Rent Your <span className="block text-gray-300">Dream Car</span>
              </h1>

              <p className="mt-8 text-lg leading-8 text-gray-300 max-w-xl">
                DriveFleet makes renting cars simple, secure and affordable.
                Choose from hundreds of verified vehicles for business,
                vacations or daily travel.
              </p>

              <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href={"/explore-cars"}>
                <button className="bg-[#8a0e37] hover:bg-[#bd2a5b] transition duration-300 text-white px-8 py-4 rounded-xl font-semibold shadow-lg">
                  Explore Cars
                </button>
                </Link>

                <Link href={"/add-car"}>
                <button className="border border-white text-white hover:bg-[#bd2a5b] hover:text-white transition duration-300 px-8 py-4 rounded-xl font-semibold">
                  Add Your Car
                </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-16 grid grid-cols-3 gap-6 text-center lg:text-left">
                <div>
                  <h2 className="text-3xl font-bold text-white">150+</h2>
                  <p className="text-gray-400 mt-1">Cars</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">10K+</h2>
                  <p className="text-gray-400 mt-1">Bookings</p>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">4.8★</h2>
                  <p className="text-gray-400 mt-1">Rating</p>
                </div>
              </div>
            </div>

            {/* Right (Responsive Image Container) */}
            <div className="order-1 lg:order-2 relative">
              <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-[100px]"></div>

              <Image
                src="/images/car-3.jpg"
                alt="Luxury Car"
                width={600}
                height={800}
                className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[600px] object-cover rounded-3xl shadow-2xl border border-white/10"
              />
            </div>

          </div>
        </div>
      </section>
    </main>

    {/* FeaturedCars, WhyChooseUs and Testimonial components */}
    <FeaturedCars></FeaturedCars>
    <WhyChooseUs></WhyChooseUs>
    <Testimonials></Testimonials>
    </>
  );
}