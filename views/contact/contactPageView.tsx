import type { ContactChannel } from "@/lib/types/contactChannel";
import { ContactChannelsList } from "@/views/contact/contactChannelsList";
import { ContactFormSection } from "@/views/contact/contactFormSection";
import { ContactHeroSection } from "@/views/contact/contactHeroSection";
import { ContactSideImage } from "@/views/contact/contactSideImage";

type Props = {
  channels: ContactChannel[];
  sideImage: { src: string; alt: string };
};

export function ContactPageView({ channels, sideImage }: Props) {
  return (
    <main className="pt-16">
      <ContactHeroSection />
      <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-24 md:grid-cols-2 md:px-10">
        <div>
          <ContactChannelsList channels={channels} />
          <ContactSideImage src={sideImage.src} alt={sideImage.alt} />
        </div>
        <ContactFormSection />
      </section>
    </main>
  );
}
