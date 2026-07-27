import Image from "next/image";

import { PageContainer } from "@/shared/components/layout/page-container";

const description =
  "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است.";

const features = [
  {
    title: "جوایز ویژه",
    description,
    image: "/assets/features/gift.png",
  },
  {
    title: "پشتیبانی حرفه‌ای",
    description,
    image: "/assets/features/support.png",
  },
  {
    title: "ارسال رایگان",
    description,
    image: "/assets/features/rocket.png",
  },
  {
    title: "گزارش فروش",
    description,
    image: "/assets/features/report.png",
  },
  {
    title: "رویدادهای ویژه",
    description,
    image: "/assets/features/events.png",
  },
  {
    title: "شبکه همکاران",
    description,
    image: "/assets/features/network.png",
  },
] as const;

export function FeatureGrid() {
  return (
    <section aria-labelledby="customer-club-features-title">
      <PageContainer className="flex flex-col items-end gap-8 px-0 pb-12 min-[1440px]:min-h-[633px] min-[1440px]:px-10 min-[1440px]:pb-0">
        <h2
          id="customer-club-features-title"
          className="h-[37px] text-right text-[24px] font-bold leading-[37px] tracking-[-0.18px] text-[#15181a]"
        >
          ویژگی‌های <span className="text-[#7c49f2]">پاراف‌کلاب</span>
        </h2>

        <div
          dir="rtl"
          className="grid w-full gap-6 sm:grid-cols-2 min-[1440px]:px-20 xl:grid-cols-3"
        >
          {features.map(({ title, description: featureDescription, image }) => (
            <article
              key={title}
              className="group flex min-h-[230px] min-w-0 flex-col items-center gap-2 rounded-[24px] bg-[linear-gradient(216deg,#fff_0%,#ecf0f2_100%)] px-6 py-8 text-center shadow-[0_0_6px_rgba(102,120,128,.40)] transition-transform duration-300 hover:-translate-y-1 min-[1440px]:h-[270px]"
            >
              <div className="relative size-[120px] shrink-0">
                <Image
                  src={image}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="120px"
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex w-full min-w-0 flex-col items-center gap-1.5">
                <h3 className="max-w-full truncate text-[16px] font-bold leading-[30px] tracking-[-0.12px] text-[#15181a]">
                  {title}
                </h3>
                <p className="w-full truncate text-[14px] leading-[25px] tracking-[-0.105px] text-[#667880]">
                  {featureDescription}
                </p>
              </div>
            </article>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
