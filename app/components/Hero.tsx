import { RainbowButton } from "@/components/ui/rainbow-button";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/public/Dashboard_Page.png";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-12 lg:py-20">
      <div className="text-center">
        <span className="text-sm text-primary font-medium tracking-tight bg-primary/10 px-4 py-2 rounded-full">
          Introduction Invoicely 1.0
        </span>
        <h1 className="mt-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold">
          Invoice made{" "}
          <span className="block -mt-2 pb-2 bg-gradient-to-l from-blue-500 via-teal-500 to-green-500 text-transparent bg-clip-text">
            super easy!
          </span>
        </h1>

        <p className="max-w-xl mx-auto mt-4 lg:text-lg text-muted-foreground">
          Effortlessly generate, deliver, and keep track of your invoices—all in
          one place! Simplify your workflow and get paid faster with Invoicely.
        </p>

        <Link href="/login" className="mt-7 mb-12 inline-block">
          <RainbowButton>Get Unlimited Access</RainbowButton>
        </Link>

        <div className="relative items-center w-full py-12 mx-auto mt-12">
          <Image
            src={HeroImage}
            alt="Hero Image"
            className="relative object-cover w-full border rounded-lg lg:rounded-2xl shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
}
