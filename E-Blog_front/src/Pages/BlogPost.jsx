import React from "react";

function BlogPost() {
  return (
    <div>
      <div className="max-w-screen-xl mx-auto p-5 sm:p-8 md:p-12 relative">
        <div
          className="bg-cover h-64 text-center overflow-hidden"
          style={{
            height: "450px",
            backgroundImage:
              "url('https://api.time.com/wp-content/uploads/2020/07/never-trumpers-2020-election-01.jpg?quality=85&w=1201&h=676&crop=1')",
          }}
        ></div>

        <div className="max-w-2xl mx-auto">
          <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
            <div>
              <div className="mb-2">
                <a
                  href="#"
                  className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  Election
                </a>
                ,{" "}
                <a
                  href="#"
                  className="text-xs text-indigo-600 uppercase font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  Politics
                </a>
              </div>

              <h1 className="text-gray-900 font-bold text-3xl mb-2">
                Revenge of the Never Trumpers
              </h1>

              <p className="text-gray-700 text-xs mt-2">
                Written By:{" "}
                <a
                  href="#"
                  className="text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                >
                  Ahmad Sultani
                </a>
              </p>

              <p className="text-base leading-8 my-5">
                Revenge of the Never Trumpers" is a political commentary that
                explores the persistent influence and strategies of the faction
                of Republicans and conservatives who opposed Donald Trump
                throughout his political career, commonly referred to as the
                “Never Trumpers.” This term generally refers to individuals
                within the Republican Party who consistently resisted Trump's
                policies, rhetoric, and candidacy, arguing that he was
                detrimental to the party's traditional values and American
                democracy.
              </p>

              <h3 className="text-2xl font-bold my-5">
                #1. What is Lorem Ipsum?
              </h3>

              <p className="text-base leading-8 my-5">
                The book/article examines how Never Trumpers organized both
                during and after Trump’s presidency to challenge his agenda,
                influence elections, and shape the future of the Republican
                Party. Their efforts included public advocacy, writing opinion
                pieces, funding political campaigns, and leveraging media
                platforms.
              </p>

              <blockquote className="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">
                It highlights the ideological divide within the GOP, contrasting
                Trump-aligned conservatives, who focus on populism, nationalism,
                and direct voter appeal, with Never Trumpers, who emphasize
                traditional conservative principles such as free markets,
                institutional norms, and global alliances.
              </blockquote>

              <p className="text-base leading-8 my-5">
                "Revenge of the Never Trumpers" serves as a lens into the
                internal conflicts of the modern Republican Party, illustrating
                the challenges of party unity when personal principles,
                ideological purity, and populist momentum collide. It also
                raises questions about the long-term influence of dissenting
                voices in shaping party strategy and national politics.
              </p>

              <div className="flex flex-wrap gap-2">
                {["Election", "people", "Election2020", "trump", "Joe"].map(
                  (tag) => (
                    <a
                      key={tag}
                      href="#"
                      className="text-xs text-indigo-600 font-medium hover:text-gray-900 transition duration-500 ease-in-out"
                    >
                      #{tag}
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPost;
