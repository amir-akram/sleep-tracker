import { SignInButton } from '@clerk/nextjs';
import Image from "next/image";

const Guest = () => {
  return (
    <div className='font-sans bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100'>
      {/* Hero Section */}
      <div className='flex flex-col md:flex-row items-center justify-between p-3 md:p-16 pt-20 bg-gradient-to-r from-[#3F8A00] via-[#89C60E] to-[#DFF79A] text-white rounded-b-3xl shadow-lg'>
        <div className='flex-1 mb-8 xl:pl-10'>
          <h1 className='text-2xl md:text-4xl font-bold mb-4 '>
            Welcome to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-300 ">
              Tracker-360
            </span>
          </h1>
          <p className='md:text-xl mb-6'>
            Track your <strong>sleep, workouts, and routines</strong> to build a healthier lifestyle — all in one place with <strong>Tracker-360</strong>.
          </p>
          <SignInButton>
            <button className='w-full md:w-auto bg-white text-[#3F8A00] hover:bg-gray-100 px-5 py-2 rounded-md font-semibold cursor-pointer shadow-md transition'>
              Get Started
            </button>
          </SignInButton>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <Image
            src="/sleep-tracker.png"
            alt="Tracker-360 Illustration"
            width={600}
            height={400}
            className="w-full md:max-w-md rounded-tl-3xl rounded-br-3xl shadow-xl"
          />
        </div>
      </div>

      {/* FAQ Section */}
      <div className='py-16 px-8 bg-white dark:bg-gray-800'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100'>
          Frequently Asked Questions
        </h2>
        <div className='max-w-3xl mx-auto space-y-8'>
          <div>
            <h3 className='text-xl font-bold text-[#3F8A00] dark:text-[#DFF79A]'>What is Tracker-360?</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Tracker-360 is your all-in-one routine tracker. From sleep cycles
              to gym progress, it helps you stay consistent and improve daily habits.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold text-[#3F8A00] dark:text-[#DFF79A]'>How does it work?</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Tracker-360 lets you log and visualize your routines. It provides
              personalized insights to help you sleep better, train smarter,
              and balance your lifestyle.
            </p>
          </div>
          <div>
            <h3 className='text-xl font-bold text-[#3F8A00] dark:text-[#DFF79A]'>Is Tracker-360 free?</h3>
            <p className='text-gray-600 dark:text-gray-300'>
              Yes, Tracker-360 offers a free plan with basic features. Premium
              plans are available for advanced analytics and habit coaching.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className='py-16 px-8 bg-gray-50 dark:bg-gray-900'>
        <h2 className='text-2xl md:text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100'>
          What Our Users Say
        </h2>
        <div className='max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow'>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              &quot;Tracker-360's AI insights feature has completely fixed my sleep cycle. I now wake
              up refreshed and ready for the day!&quot;
            </p>
            <p className='text-[#3F8A00] font-bold'>- Khadeeja K. </p>
          </div>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow'>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              &quot;The gym progress tracking keeps me motivated. Watching my
              weights & attendance go up feels amazing, Dhanyawaad Tracker-360!&quot;
            </p>
            <p className='text-[#3F8A00] font-bold'>- Naivyam Pandey</p>
          </div>
          <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow'>
            <p className='text-gray-700 dark:text-gray-300 mb-4'>
              &quot;I love how Tracker-360 combines everything — sleep, fitness,
              and routines. The Streaks remind me of Snapchat !&quot;
            </p>
            <p className='text-[#3F8A00] font-bold'>- Saket Gokhle</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guest;
