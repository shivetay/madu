import bcrypt from "bcryptjs";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });
const password = await rl.question("Podaj hasło dla konta studia: ");
rl.close();

if (!password || password.length < 8) {
  console.error("Hasło powinno mieć co najmniej 8 znaków.");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
console.log("\nDodaj do pliku .env (jedna linia):\n");
console.log(`STUDIO_PASSWORD_HASH=${hash}`);
console.log(
  "\nWygeneruj też AUTH_SECRET, np.: npx auth secret   (pakiet @auth/core) lub openssl rand -base64 32\n",
);
