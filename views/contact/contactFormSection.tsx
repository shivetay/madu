export function ContactFormSection() {
  return (
    <div>
      <h2
        className="mb-8 text-2xl"
        style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 300 }}
      >
        Wyślij wiadomość
      </h2>
      <form
        className="flex flex-col gap-6"
        action="mailto:hello@maduhome.com"
        method="GET"
      >
        <div className="flex flex-col gap-2">
          <label
            htmlFor="name"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Imię i nazwisko
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-foreground focus:outline-none"
            placeholder="Twoje imię i nazwisko"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-foreground focus:outline-none"
            placeholder="twoj@email.pl"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Temat
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            className="border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-foreground focus:outline-none"
            placeholder="W czym możemy pomóc?"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="text-xs uppercase tracking-widest text-muted-foreground"
          >
            Wiadomość
          </label>
          <textarea
            id="message"
            name="body"
            rows={5}
            required
            className="resize-none border-b border-border bg-transparent pb-3 text-sm text-foreground placeholder:text-muted-foreground/60 transition-colors focus:border-foreground focus:outline-none"
            placeholder="Opowiedz nam o swoim projekcie..."
          />
        </div>
        <button
          type="submit"
          className="mt-2 self-start border border-foreground px-10 py-3 text-xs uppercase tracking-widest text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
        >
          Wyślij wiadomość
        </button>
      </form>
    </div>
  );
}
