import type { Metadata } from "next";
import {
  getContactChannels,
  getContactSideImage,
} from "@/lib/data/contactChannels";
import { ContactPageView } from "@/views/contact/contactPageView";

export const metadata: Metadata = {
  title: "Kontakt | MADU HOME",
  description:
    "Skontaktuj się z MADU HOME, aby porozmawiać o projekcie wnętrz.",
};

export default async function ContactPage() {
  const [channels, sideImage] = await Promise.all([
    getContactChannels(),
    getContactSideImage(),
  ]);

  return <ContactPageView channels={channels} sideImage={sideImage} />;
}
