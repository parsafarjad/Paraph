// "use client";
// import Image from "next/image";

// import { PageContainer } from "@/shared/components/layout/page-container";

// interface WelcomeHeroProps {
//   userName?: string;
// }

// export function WelcomeHero({ userName }: WelcomeHeroProps) {
//   const firstName = userName?.trim().split(/\s+/)[0] || "آرین";

//   return (
//     <section
//       aria-labelledby="customer-club-welcome-title"
//       className="relative min-h-[362px] overflow-hidden max-lg:flex max-lg:h-full"
//     >
//       <PageContainer className="relative min-h-[362px]">
//         <div className="mx-auto flex h-[200px] w-[900px] flex-col items-center justify-center gap-5 py-8 min-[1440px]:block min-[1440px]:min-h-[362px] min-[1440px]:py-0 lg:flex-row">
//           <div className="relative z-10 flex h-[200px] w-[900px] items-center justify-start rounded-[88px] border border-white/80 bg-white text-left shadow-[0_12px_40px_rgba(91,104,155,0.08)] min-[1440px]:absolute min-[1440px]:top-20 min-[1440px]:right-[20.2%] min-[1440px]:w-[54.82%] min-[1440px]:max-w-none min-[1440px]:rounded-[101px] min-[1440px]:pr-20 lg:px-16 lg:text-right">
//             <div className="relative z-20 max-w-[690px]">
//               <p className="mb-2 text-[16px] leading-7 font-medium text-[#15181a] min-[1440px]:text-[20px]">
//                 {firstName} عزیز
//               </p>

//               <div
//                 id="customer-club-welcome-title"
//                 className="font-doran flex text-[25px] leading-[1.6] font-black text-[#7c49f2] min-[1440px]:text-[40px] min-[1440px]:leading-[62px] min-[1440px]:whitespace-nowrap sm:text-[30px]"
//               >
//                 <span>به </span>
//                 <div className="animate-zoom-in animate-duration-[2000ms] animate-linear repeat-infinite">
//                   <span>پاراف کلاب</span>{" "}
//                   <span className="font-thin text-[#7c49f2]">
//                     (باشگاه مشتریان پاراف)
//                   </span>{" "}
//                 </div>
//                 <span>خوش اومدی!</span>
//               </div>
//             </div>
//           </div>

//           <div className="relative z-20 h-[255px] w-[260px] shrink-0 min-[1440px]:absolute min-[1440px]:top-0 min-[1440px]:left-[14.15%] min-[1440px]:h-[358px] min-[1440px]:w-[358px] lg:-mr-16">
//             <Image
//               src="/assets/hero-trophy.svg"
//               alt="جام باشگاه مشتریان پاراف"
//               width={270}
//               height={265}
//               priority
//               className="animate-sway animate-duration-[5000ms] animate-ease-in-out repeat-infinite absolute top-2 left-[42px] h-[220px] w-[224px] origin-bottom object-contain min-[1440px]:top-[35px] min-[1440px]:left-[20px] min-[1440px]:h-[270px] min-[1440px]:w-[275px] max-lg:hidden"
//             />

//             <Image
//               src="/assets/bag-coin.svg"
//               alt="کیسه سکه باشگاه مشتریان پاراف"
//               width={150}
//               height={148}
//               priority
//               className="animate-sway animate-duration-[5000ms] animate-ease-in-out repeat-infinite absolute bottom-0 left-0 h-[112px] w-[115px] origin-bottom object-contain min-[1440px]:right-[30px] min-[1440px]:bottom-[25px] min-[1440px]:h-[166px] min-[1440px]:w-[170px] max-lg:hidden"
//             />
//           </div>

//           <Image
//             src="/assets/spark.svg"
//             alt=""
//             aria-hidden="true"
//             width={285}
//             height={285}
//             className="animate-pulsing animate-duration-[1800ms] animate-ease-in-out repeat-infinite pointer-events-none absolute top-[20px] left-[42%] hidden h-[350px] w-[350px] object-contain min-[1440px]:block max-lg:hidden"
//           />
//           <Image
//             src="/assets/spark.svg"
//             alt=""
//             aria-hidden="true"
//             width={285}
//             height={285}
//             className="animate-zoom-in animate-duration-[2000ms] animate-linear repeat-infinite pointer-events-none absolute top-[20px] left-[65%] hidden h-[350px] w-[350px] rotate-180 object-contain min-[1440px]:block max-lg:hidden"
//           />
//           <Image
//             src="/assets/spark.svg"
//             alt=""
//             aria-hidden="true"
//             width={285}
//             height={285}
//             className="animate-zoom-in animate-duration-[2000ms] animate-linear repeat-infinite pointer-events-none absolute top-[20px] right-[65%] hidden h-[350px] w-[350px] object-contain min-[1440px]:block max-lg:hidden"
//           />
//         </div>
//       </PageContainer>
//     </section>
//   );
// }

"use client";

import Image from "next/image";

import { PageContainer } from "@/shared/components/layout/page-container";

interface WelcomeHeroProps {
  userName?: string;
}

export function WelcomeHero({ userName }: WelcomeHeroProps) {
  const firstName = userName?.trim().split(/\s+/)[0] || "آرین";

  return (
    <>
      {/* Mobile and tablet: below lg */}
      <section
        aria-labelledby="customer-club-welcome-title-mobile"
        className="flex w-full items-center justify-center overflow-hidden px-4 py-8 lg:hidden"
      >
        <PageContainer className="flex w-full items-center justify-center px-0">
          <div
            className="
              relative z-10 flex min-h-[200px] w-full max-w-[900px]
              items-center justify-center
              rounded-[36px] border border-white/80
              bg-white px-5 py-8 text-center
              shadow-[0_12px_40px_rgba(91,104,155,0.08)]

              sm:rounded-[64px] sm:px-10
            "
          >
            <div className="relative z-20 mx-auto w-full max-w-[690px]">
              <p className="mb-2 text-center text-[16px] font-medium leading-7 text-[#15181a]">
                {firstName} عزیز
              </p>

              <h1
                id="customer-club-welcome-title-mobile"
                dir="rtl"
                className="
                  font-doran text-center text-[24px] font-black
                  leading-[1.9] text-[#7c49f2]
                  sm:text-[30px] sm:leading-[1.8]
                "
              >
                <span>به </span>

                <span
                  className="
                    inline-block
                    motion-safe:animate-zoom-in
                    motion-safe:animate-duration-[2000ms]
                    motion-safe:animate-linear
                    motion-safe:repeat-infinite
                  "
                >
                  <span>پاراف کلاب</span>{" "}
                  <span className="font-thin text-[#7c49f2]">
                    (باشگاه مشتریان پاراف)
                  </span>
                </span>

                <span> خوش اومدی!</span>
              </h1>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* Desktop: lg and larger — original styles preserved */}
      <section
        aria-labelledby="customer-club-welcome-title-desktop"
        className="relative hidden min-h-[362px] overflow-hidden lg:block"
      >
        <PageContainer className="relative min-h-[362px]">
          <div className="mx-auto flex h-[200px] w-[900px] flex-col items-center justify-center gap-5 py-8 lg:flex-row min-[1440px]:block min-[1440px]:min-h-[362px] min-[1440px]:py-0">
            <div className="relative z-10 flex h-[200px] w-[900px] items-center justify-start rounded-[88px] border border-white/80 bg-white text-left shadow-[0_12px_40px_rgba(91,104,155,0.08)] lg:px-16 lg:text-right min-[1440px]:absolute min-[1440px]:right-[20.2%] min-[1440px]:top-20 min-[1440px]:w-[54.82%] min-[1440px]:max-w-none min-[1440px]:rounded-[101px] min-[1440px]:pr-20">
              <div className="relative z-20 max-w-[690px]">
                <p className="mb-2 text-[16px] font-medium leading-7 text-[#15181a] min-[1440px]:text-[20px]">
                  {firstName} عزیز
                </p>

                <h1
                  id="customer-club-welcome-title-desktop"
                  className="font-doran flex text-[25px] font-black leading-[1.6] text-[#7c49f2] sm:text-[30px] min-[1440px]:whitespace-nowrap min-[1440px]:text-[40px] min-[1440px]:leading-[62px]"
                >
                  <span>به </span>

                  <span className="animate-zoom-in animate-duration-[2000ms] animate-linear repeat-infinite inline-block">
                    <span>پاراف کلاب</span>{" "}
                    <span className="font-thin text-[#7c49f2]">
                      (باشگاه مشتریان پاراف)
                    </span>{" "}
                  </span>

                  <span>خوش اومدی!</span>
                </h1>
              </div>
            </div>

            <div className="relative z-20 h-[255px] w-[260px] shrink-0 lg:-mr-16 min-[1440px]:absolute min-[1440px]:left-[14.15%] min-[1440px]:top-0 min-[1440px]:h-[358px] min-[1440px]:w-[358px]">
              <Image
                src="/assets/hero-trophy.svg"
                alt="جام باشگاه مشتریان پاراف"
                width={270}
                height={265}
                priority
                className="animate-sway animate-duration-[5000ms] animate-ease-in-out repeat-infinite absolute left-[42px] top-2 h-[220px] w-[224px] origin-bottom object-contain min-[1440px]:left-[20px] min-[1440px]:top-[35px] min-[1440px]:h-[270px] min-[1440px]:w-[275px]"
              />

              <Image
                src="/assets/bag-coin.svg"
                alt="کیسه سکه باشگاه مشتریان پاراف"
                width={150}
                height={148}
                priority
                className="animate-sway animate-duration-[5000ms] animate-ease-in-out repeat-infinite absolute bottom-0 left-0 h-[112px] w-[115px] origin-bottom object-contain min-[1440px]:bottom-[25px] min-[1440px]:right-[30px] min-[1440px]:h-[166px] min-[1440px]:w-[170px]"
              />
            </div>

            <Image
              src="/assets/spark.svg"
              alt=""
              aria-hidden="true"
              width={285}
              height={285}
              className="animate-pulsing animate-duration-[1800ms] animate-ease-in-out repeat-infinite pointer-events-none absolute left-[42%] top-[20px] hidden h-[350px] w-[350px] object-contain min-[1440px]:block"
            />

            <Image
              src="/assets/spark.svg"
              alt=""
              aria-hidden="true"
              width={285}
              height={285}
              className="animate-zoom-in animate-duration-[2000ms] animate-linear repeat-infinite pointer-events-none absolute left-[65%] top-[20px] hidden h-[350px] w-[350px] rotate-180 object-contain min-[1440px]:block"
            />

            <Image
              src="/assets/spark.svg"
              alt=""
              aria-hidden="true"
              width={285}
              height={285}
              className="animate-zoom-in animate-duration-[2000ms] animate-linear repeat-infinite pointer-events-none absolute right-[65%] top-[20px] hidden h-[350px] w-[350px] object-contain min-[1440px]:block"
            />
          </div>
        </PageContainer>
      </section>
    </>
  );
}