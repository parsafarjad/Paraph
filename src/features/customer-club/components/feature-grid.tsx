import Image from "next/image";

import { PageContainer } from "@/shared/components/layout/page-container";

const description =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.";

const features = [
  {
    title: "جوایز ویژه",
    description,
    image: "/assets/features/gift.svg",
  },
  {
    title: "پشتیبانی حرفه‌ای",
    description,
    image: "/assets/features/support.svg",
  },
  {
    title: "ارسال رایگان",
    description,
    image: "/assets/features/rocket.svg",
  },
  {
    title: "گزارش فروش",
    description,
    image: "/assets/features/report.svg",
  },
  {
    title: "رویدادهای ویژه",
    description,
    image: "/assets/features/events.svg",
  },
  {
    title: "شبکه همکاران",
    description,
    image: "/assets/features/network.svg",
  },
] as const;

export function FeatureGrid() {
  return (
    <section
      aria-labelledby="customer-club-features-title"
      className="overflow-visible"
    >
      <PageContainer className="flex flex-col items-start gap-8 px-0 pb-12 min-[1440px]:min-h-[633px] min-[1440px]:px-10 min-[1440px]:pb-0">
        <h2
          id="customer-club-features-title"
          className="h-[37px] text-left text-[24px] leading-[37px] font-bold tracking-[-0.18px] text-[#15181a]"
        >
          ویژگی‌های <span className="text-[#7c49f2]">پاراف‌کلاب</span>
        </h2>

        <div
          dir="rtl"
          className="grid w-full gap-6 min-[1440px]:px-20 sm:grid-cols-2 xl:grid-cols-3"
        >
          {features.map(({ title, description: featureDescription, image }) => (
            <FeatureCard
              key={title}
              title={title}
              description={featureDescription}
              image={image}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

// interface FeatureCardProps {
//   title: string;
//   description: string;
//   image: string;
// }

// function FeatureCard({
//   title,
//   description: featureDescription,
//   image,
// }: FeatureCardProps) {
//   return (
//     <article
//       tabIndex={0}
//       className={cn(
//         `
//           group relative isolate
//           flex min-h-[230px] min-w-0
//           cursor-default flex-col items-center
//           overflow-visible rounded-[24px]
//           px-6 py-8 text-center
//           outline-none

//           min-[1440px]:h-[270px]
//         `,
//       )}
//     >
//       {/* Default card background */}
//       <span
//         aria-hidden="true"
//         className="
//           pointer-events-none absolute inset-0 -z-20
//           rounded-[24px]
//           bg-[linear-gradient(216deg,#ffffff_0%,#ecf0f2_100%)]
//           shadow-[0_0_6px_rgba(102,120,128,0.4)]

//           transition-[opacity,transform]
//           duration-[380ms] ease-[cubic-bezier(.22,1,.36,1)]

//           group-hover:opacity-0
//           group-focus-visible:opacity-0
//         "
//       />

//       {/* Hover background */}
//       <span
//         aria-hidden="true"
//         className="
//           pointer-events-none absolute inset-0 -z-10
//           rounded-[24px]
//           border-[2px] border-[#9e76ff]
//           bg-[radial-gradient(circle_at_50%_48%,rgba(255,255,255,0.92)_0%,rgba(246,241,255,0.95)_46%,rgba(222,211,255,0.96)_100%)]

//           opacity-0
//           shadow-[0_0_0_1px_rgba(124,73,242,0.08),0_0_20px_rgba(139,91,255,0.38),0_0_42px_rgba(190,149,255,0.36)]

//           transition-[opacity,transform,box-shadow]
//           duration-[380ms]
//           ease-[cubic-bezier(.22,1,.36,1)]

//           group-hover:opacity-100
//           group-focus-visible:opacity-100
//         "
//       />

//       {/* Animated ambient glow */}
//       <span
//         aria-hidden="true"
//         className="
//           pointer-events-none absolute left-1/2 top-1/2 -z-10
//           h-[75%] w-[75%]
//           -translate-x-1/2 -translate-y-1/2
//           scale-[0.72] rounded-full
//           bg-[#c895ff]/30 blur-[34px]
//           opacity-0

//           transition-[opacity,transform]
//           duration-500
//           ease-[cubic-bezier(.22,1,.36,1)]

//           group-hover:scale-100
//           group-hover:opacity-100

//           group-focus-visible:scale-100
//           group-focus-visible:opacity-100
//         "
//       />

//       <div
//         className="
//           relative z-10 flex h-full w-full
//           flex-col items-center
//         "
//       >
//         <div
//           className="
//             relative size-[120px] shrink-0

//             transition-[transform]
//             duration-[420ms]
//             ease-[cubic-bezier(.22,1,.36,1)]

//             group-hover:-translate-y-[5px]
//             group-hover:scale-[0.82]

//             group-focus-visible:-translate-y-[5px]
//             group-focus-visible:scale-[0.82]
//           "
//         >
//           <Image
//             src={image}
//             alt=""
//             aria-hidden="true"
//             fill
//             sizes="120px"
//             className="
//               select-none object-contain
//               drop-shadow-[0_8px_10px_rgba(39,42,55,0.10)]

//               transition-[filter,transform]
//               duration-[420ms]
//               ease-[cubic-bezier(.22,1,.36,1)]

//               group-hover:drop-shadow-[0_10px_14px_rgba(74,46,130,0.16)]
//               group-focus-visible:drop-shadow-[0_10px_14px_rgba(74,46,130,0.16)]
//             "
//           />
//         </div>

//         <div
//           className="
//             flex w-full min-w-0 flex-1
//             -translate-y-[1px]
//             flex-col items-center

//             transition-transform
//             duration-[420ms]
//             ease-[cubic-bezier(.22,1,.36,1)]

//             group-hover:-translate-y-[13px]
//             group-focus-visible:-translate-y-[13px]
//           "
//         >
//           <h3
//             className="
//               max-w-full truncate
//               text-[16px] font-bold leading-[30px]
//               tracking-[-0.12px] text-[#15181a]

//               transition-[color,transform]
//               duration-300 ease-out

//               group-hover:text-[#ff302b]
//               group-focus-visible:text-[#ff302b]
//             "
//           >
//             {title}
//           </h3>

//           <div
//             className="
//               relative mt-1.5
//               w-full overflow-hidden
//               transition-[height]
//               duration-[420ms]
//               ease-[cubic-bezier(.22,1,.36,1)]

//               h-[25px]
//               group-hover:h-[74px]
//               group-focus-visible:h-[74px]
//             "
//           >
//             <p
//               className="
//                 absolute inset-x-0 top-0
//                 overflow-hidden text-ellipsis whitespace-nowrap
//                 text-[14px] leading-[25px]
//                 tracking-[-0.105px] text-[#667880]

//                 transition-[opacity,transform]
//                 duration-200 ease-out

//                 group-hover:-translate-y-1
//                 group-hover:opacity-0

//                 group-focus-visible:-translate-y-1
//                 group-focus-visible:opacity-0
//               "
//             >
//               {featureDescription}
//             </p>

//             <p
//               className="
//                 absolute inset-x-0 top-0
//                 line-clamp-3
//                 translate-y-2
//                 text-[13px] leading-[24px]
//                 tracking-[-0.1px] text-[#2e3038]
//                 opacity-0

//                 transition-[opacity,transform]
//                 delay-75 duration-300
//                 ease-[cubic-bezier(.22,1,.36,1)]

//                 group-hover:translate-y-0
//                 group-hover:opacity-100

//                 group-focus-visible:translate-y-0
//                 group-focus-visible:opacity-100
//               "
//             >
//               {featureDescription}
//             </p>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
}

function FeatureCard({ title, description, image }: FeatureCardProps) {
  return (
    <div className="group relative min-h-[230px] min-w-0 rounded-[24px] [perspective:1200px] min-[1440px]:h-[270px]">
      {/* Purple ambient glow — it stays outside the flipping element */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[12px] -z-10 scale-[0.86] rounded-[34px] bg-[radial-gradient(circle_at_center,rgba(184,116,255,0.58)_0%,rgba(153,92,255,0.30)_42%,transparent_74%)] opacity-0 blur-[20px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100"
      />

      <article
        tabIndex={0}
        className="motion-safe:group-hover:animate-flip-in-x motion-safe:group-hover:animate-duration-500 motion-safe:group-hover:animate-ease-in-out motion-safe:group-hover:animate-fill-mode-both motion-safe:group-focus-within:animate-flip-in-x motion-safe:group-focus-within:animate-duration-500 motion-safe:group-focus-within:animate-ease-in-out motion-safe:group-focus-within:animate-fill-mode-both relative isolate flex h-full min-h-[230px] min-w-0 transform-gpu cursor-default flex-col items-center overflow-hidden rounded-[24px] border border-transparent bg-[linear-gradient(216deg,#ffffff_0%,#ecf0f2_100%)] px-6 py-8 text-center shadow-[0_0_6px_rgba(102,120,128,0.40)] transition-[background-color,border-color,box-shadow] duration-300 ease-out outline-none [backface-visibility:hidden] [transform-style:preserve-3d] group-focus-within:border-[2px] group-focus-within:border-[#a277ff] group-focus-within:bg-[#eee8ff] group-focus-within:shadow-[0_0_0_1px_rgba(124,73,242,0.10),0_0_18px_rgba(153,92,255,0.48),0_0_38px_rgba(192,139,255,0.36)] group-hover:border-[2px] group-hover:border-[#a277ff] group-hover:bg-[#eee8ff] group-hover:shadow-[0_0_0_1px_rgba(124,73,242,0.10),0_0_18px_rgba(153,92,255,0.48),0_0_38px_rgba(192,139,255,0.36)] motion-reduce:animate-none min-[1440px]:h-[270px]"
      >
        {/* Lavender hover background */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.97)_0%,rgba(249,246,255,0.94)_35%,rgba(230,218,255,0.96)_100%)] opacity-0 transition-opacity duration-300 ease-out group-focus-within:opacity-100 group-hover:opacity-100"
        />

        {/* Inner soft light */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[44%] left-1/2 -z-10 h-[170px] w-[280px] -translate-x-1/2 -translate-y-1/2 scale-75 rounded-full bg-white/70 opacity-0 blur-[42px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100"
        />

        <div className="relative size-[120px] shrink-0 transform-gpu transition-[transform,filter] duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] group-focus-within:-translate-y-[7px] group-focus-within:scale-[0.72] group-focus-within:grayscale group-hover:-translate-y-[7px] group-hover:scale-[0.72] group-hover:grayscale">
          <Image
            src={image}
            alt=""
            aria-hidden="true"
            fill
            sizes="120px"
            draggable={false}
            className="object-contain drop-shadow-[0_8px_10px_rgba(39,42,55,0.10)] transition-[filter] duration-[420ms] select-none group-focus-within:drop-shadow-[0_10px_16px_rgba(86,55,145,0.17)] group-hover:drop-shadow-[0_10px_16px_rgba(86,55,145,0.17)]"
          />
        </div>

        <div className="flex w-full min-w-0 flex-1 transform-gpu flex-col items-center transition-transform duration-[420ms] ease-[cubic-bezier(.22,1,.36,1)] group-focus-within:-translate-y-[16px] group-hover:-translate-y-[16px]">
          <h3 className="max-w-full truncate text-[16px] leading-[30px] font-bold tracking-[-0.12px] text-[#15181a] transition-colors duration-300 ease-out group-focus-within:text-[#ff302b] group-hover:text-[#ff302b]">
            {title}
          </h3>

          <p className="mt-1.5 w-full overflow-hidden text-[14px] leading-[25px] tracking-[-0.105px] text-ellipsis whitespace-nowrap text-[#667880] transition-[color] duration-300 ease-out group-focus-within:line-clamp-3 group-focus-within:whitespace-normal group-focus-within:text-[#25272d] group-hover:line-clamp-3 group-hover:whitespace-normal group-hover:text-[#25272d]">
            {description}
          </p>
        </div>
      </article>
    </div>
  );
}
