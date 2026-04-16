import type { ContactChannel } from "@/lib/types/contactChannel";

type Props = {
  channels: ContactChannel[];
};

export function ContactChannelsList({ channels }: Props) {
  return (
    <div className="divide-y divide-border">
      {channels.map(({ label, value, href }) => (
        <div
          key={label}
          className="flex items-center justify-between py-6"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {label}
          </p>
          <a
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={
              href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            className="text-sm text-foreground transition-colors duration-200 hover:text-accent"
          >
            {value}
          </a>
        </div>
      ))}
    </div>
  );
}
