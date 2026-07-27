import Image from "next/image";

export function CampaignBanner() {
  return (
    <section
      aria-label="کمپین جشن سالگرد اکسیژن"
      className="relative h-[180px] w-full overflow-hidden bg-[#0a1659] sm:h-[220px] min-[1200px]:h-[284px]"
    >
      <Image
        src="/assets/banner.png"
        alt="جشن سالگرد اکسیژن با تخفیف ویژه"
        fill
        sizes="100vw"
        priority={false}
        className="object-cover object-center"
      />
    </section>
  );
}
