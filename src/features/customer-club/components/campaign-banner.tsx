import Image from "next/image";

export function CampaignBanner() {
  return (
    <section className="relative flex h-[285px] items-center justify-center border-y shadow-[0_18px_50px_rgba(5,21,92,.3)]">
      <Image
        src="/assets/banner.png"
        alt="کمپین جشن اکسیژن پاراف"
        width={2000}
        height={2000}
        className="h-[285px] w-full object-cover absolute -bottom-5.5"
      />
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-indigo-950/10 via-transparent to-indigo-950/10" /> */}
    </section>
  );
}
