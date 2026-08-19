import { Hero } from '@/components/sections/Hero';
import { ServicesOverview } from '@/components/sections/ServicesOverview';
import { Hosting } from '@/components/sections/Hosting';
import { Domains } from '@/components/sections/Domains';
import { GoogleWorkspace } from '@/components/sections/GoogleWorkspace';
import { SSLAddons } from '@/components/sections/SSLAddons';
import { WhyUs } from '@/components/sections/WhyUs';
import { Testimonials } from '@/components/sections/Testimonials';
import { FAQ } from '@/components/sections/FAQ';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <ServicesOverview />
      <Hosting />
      <Domains />
      <GoogleWorkspace mode="cta" />
      <SSLAddons />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
