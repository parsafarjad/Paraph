import Image from "next/image";

import { PageContainer } from "@/shared/components/layout/page-container";

interface WelcomeHeroProps {
  userName?: string;
}

export function WelcomeHero({ userName }: WelcomeHeroProps) {
  const firstName = userName?.trim().split(/\s+/)[0] || "آرین";

  return (
    <section
      aria-labelledby="customer-club-welcome-title"
      className="relative min-h-[362px] overflow-hidden"
    >
      <PageContainer className="relative min-h-[362px]">
        <div className="mx-auto flex h-[200px] w-[900px] flex-col items-center justify-center gap-5 py-8 lg:flex-row min-[1440px]:block min-[1440px]:min-h-[362px] min-[1440px]:py-0">
          <div className="relative z-10 flex h-[200px] w-full w-[900px] items-center justify-center rounded-[88px] border border-white/80 bg-white px-8 text-center shadow-[0_12px_40px_rgba(91,104,155,0.08)]  lg:px-16 lg:text-right min-[1440px]:absolute min-[1440px]:right-[20.2%] min-[1440px]:top-20  min-[1440px]:w-[54.82%] min-[1440px]:max-w-none min-[1440px]:rounded-[101px] min-[1440px]:pr-20">
            <div className="relative z-20 max-w-[690px]">
              <p className="mb-2 text-[16px] font-medium leading-7 text-[#15181a] min-[1440px]:text-[20px]">
                {firstName} عزیز
              </p>
              <h1
                id="customer-club-welcome-title"
                className="text-[25px] font-black leading-[1.6] text-[#7c49f2] sm:text-[30px] min-[1440px]:whitespace-nowrap min-[1440px]:text-[40px] min-[1440px]:leading-[62px]"
              >
                <span>به </span>
                <span>پاراف کلاب</span>{" "}
                <span className="font-normal text-[#7c49f2]">(باشگاه مشتریان پاراف)</span>{" "}
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
              className="absolute left-[42px] top-2 h-[220px] w-[224px] object-contain min-[1440px]:left-[40px] min-[1440px]:top-[35px] min-[1440px]:h-[270px] min-[1440px]:w-[275px]"
            />
            <Image
              src="/assets/bag-coin.svg"
              alt="کیسه سکه باشگاه مشتریان پاراف"
              width={150}
              height={148}
              priority
              className="absolute bottom-0 left-0 h-[112px] w-[115px] object-contain min-[1440px]:bottom-[25px] min-[1440px]:right-[10px] min-[1440px]:h-[166px] min-[1440px]:w-[170px]"
            />
          </div>

          <Image
          src={"/assets/spark.svg"}
          alt=""
            aria-hidden="true"
            width={285}
            height={285}
            className="pointer-events-none absolute left-[42%] top-[20px] w-[350px] h-[350px] hidden  min-[1440px]:block"
          />

        </div>
      </PageContainer>
    </section>
  );
}
