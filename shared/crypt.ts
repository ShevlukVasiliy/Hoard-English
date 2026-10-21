// Шифрование файлов гиста паролем: AES-GCM, ключ из пароля через PBKDF2.
// Соль общая для гиста и лежит в его маркере; у каждого файла свой iv.
const ITERATIONS = 210_000;

export type Envelope = { enc: "aes-gcm"; iv: string; data: string };

const b64 = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
const unb64 = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

// большие файлы кодируем кусками: spread всего массива переполняет стек
function b64big(bytes: Uint8Array): string {
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}

export const newSalt = () => b64(crypto.getRandomValues(new Uint8Array(16)));

export async function deriveKey(password: string, salt: string): Promise<CryptoKey> {
  const base = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: unb64(salt), iterations: ITERATIONS, hash: "SHA-256" },
    base, { name: "AES-GCM", length: 256 }, false, ["encrypt", "decrypt"],
  );
}

export async function encrypt(key: CryptoKey, text: string): Promise<Envelope> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(text)));
  return { enc: "aes-gcm", iv: b64(iv), data: b64big(data) };
}

// Неверный пароль — исключение.
export async function decrypt(key: CryptoKey, e: Envelope): Promise<string> {
  const plain = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(e.iv) }, key, unb64(e.data));
  return new TextDecoder().decode(plain);
}

export const isEnvelope = (x: unknown): x is Envelope =>
  typeof x === "object" && x !== null && (x as Envelope).enc === "aes-gcm";
