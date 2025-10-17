import React from "react";


const features = [
  {
    title: "Easy Content Management",
    desc: "Create, edit, and publish posts effortlessly. Organize your content with categories and tags..",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-violet-600">
        <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
        <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      </svg>
    ),
    hoverBg: "bg-violet-100",
    hoverBorder: "border-violet-300",
  },
  {
    title: "User Engagement Tools",
    desc: "Enable comments, social sharing, and subscriptions to connect with your audience.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 stroke-green-600">
        <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
      </svg>
    ),
    hoverBg: "bg-green-100",
    hoverBorder: "border-green-300",
  },
  {
    title: "SEO & Navigation Ready",
    desc: "Boost discoverability with search, clean URLs, and responsive layouts for any device.",
    icon: (
      <svg className="size-6 stroke-orange-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 15V3" />
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="m7 10 5 5 5-5" />
      </svg>
    ),
    hoverBg: "bg-orange-100",
    hoverBorder: "border-orange-300",
  },
];

const LandingBody = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative">
          <img
            className="max-w-2xl w-full xl:-ml-32 rounded-lg"
            src="/public/Blog creating back Cover.jpg"
            alt="Feature illustration"
          />
          <img
            className="absolute top-40 left-60 max-w-2xl w-full xl:-ml-32 rounded-lg"
            src="/public/Write Back Cover.jpg"
            alt="Overlapping illustration"
          />
        </div>
        <div className="flex flex-col gap-6 px-4 md:px-0">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`p-6 flex gap-4 rounded-xl transition-colors cursor-pointer border border-transparent hover:${feature.hoverBg} hover:${feature.hoverBorder}`}
            >
              {feature.icon}
              <div className="space-y-2">
                <h3 className="text-base font-semibold text-slate-700">{feature.title}</h3>
                <p className="text-sm text-slate-600 max-w-xs">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>
    </>
  );
};

export default LandingBody;
