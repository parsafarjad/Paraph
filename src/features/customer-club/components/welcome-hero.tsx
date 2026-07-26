import Image from "next/image";

export function WelcomeHero({ userName }: { userName?: string }) {
  const firstName = userName?.trim().split(/\s+/)[0] || "آرین";

  return (
    <section className="relative h-[270px] overflow-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.95),transparent_25%),linear-gradient(180deg,#dff3ff_0%,#d7e7ff_58%,#e4e5ff_100%)] pt-[62px]">
      <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle_at_center,rgba(80,109,255,.2)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)] [background-size:22px_22px] opacity-40" /> 
      <div className="relative mx-auto max-w-[980px] px-4">
        <div className="relative mx-auto flex h-[134px] max-w-[680px] items-center justify-center rounded-[70px] border border-white/70 bg-white/95 px-8 shadow-[0_18px_60px_rgba(77,107,183,.12)]">
          <div className="pointer-events-none absolute -bottom-10 -left-14 hidden h-[210px] w-[215px] sm:block">
            <Image
              src="/assets/hero-trophy.svg"
              alt="جام باشگاه مشتریان پاراف"
              width={174}
              height={171}
              priority
              className="absolute top-0 left-4 h-[171px] w-[174px] object-contain [animation:float_4.5s_ease-in-out_infinite]"
            /> 
            <Image
              src="/assets/bag-coin.svg"
              alt="جام باشگاه مشتریان پاراف"
              width={94}
              height={92}
              priority
              className="absolute right-2 bottom-1 h-[92px] w-[94px] object-contain [animation:float_3.8s_ease-in-out_.5s_infinite]"
            /> 
          </div> 
          <div className="text-center sm:pr-8 sm:pl-[130px] sm:text-right">
            <p className="mb-2 text-xs font-semibold text-slate-500">
              {firstName} عزیز
            </p> 
            <h1 className="text-xl leading-9 font-black text-violet-700 sm:text-[22px]">
              به پاراف کلاب 
              <span className="mx-2 text-base font-medium text-slate-500">
                (باشگاه مشتریان پاراف)
              </span> 
              خوش اومدی! 
            </h1> 
          </div> 
        </div> 
      </div> 
    </section>
  );
}
