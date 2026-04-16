import type { ContactChannel } from "@/lib/types/contactChannel";
import { media } from "@/lib/data/media";

const channels: ContactChannel[] = [
  {
    label: "E-mail",
    value: "hello@maduhome.com",
    href: "mailto:hello@maduhome.com",
  },
  {
    label: "Telefon",
    value: "+44 20 7946 0958",
    href: "tel:+442079460958",
  },
  {
    label: "Instagram",
    value: "@maduhome",
    href: "https://instagram.com/maduhome",
  },
];

export async function getContactChannels(): Promise<ContactChannel[]> {
  return channels;
}

export async function getContactSideImage(): Promise<{
  src: string;
  alt: string;
}> {
  return {
    src: media.project5,
    alt: "Wnętrze jadalni",
  };
}
