export default function splitEmail(email: string): {
  username: string | null;
  domain: string | null;
} {
  if (!email || typeof email !== "string") {
    return { username: null, domain: null };
  }

  const atIndex = email.indexOf("@");

  if (atIndex === -1 || atIndex === 0 || atIndex === email.length - 1) {
    return { username: null, domain: null };
  }

  const username = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  return { username, domain };
}
