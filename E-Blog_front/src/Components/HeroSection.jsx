

const HeroSection = () => {
  return (
    <>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        />
      </div>
      <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-32">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
        </div>
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Welcome to a world of learning!</h1>
          <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">A professional blog sharing the latest in technology, web design, and digital innovation — helping you turn ideas into impact.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a href="#" className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Start Reading</a>
            <a href="#" className="text-sm/6 font-semibold text-gray-900">Explore Categories <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </div>


    </>
  );
};

export default HeroSection;
