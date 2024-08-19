import { parseOneAddress } from "email-addresses";

function parseEmailAddress(maybeEmailAddress: string) {
  const parsed = parseOneAddress(maybeEmailAddress);

  if (parsed === null) {
    return null;
  }

  if (!("local" in parsed)) {
    return null;
  }

  const { local, domain } = parsed.parts;

  return { local, domain };
}

function convertMailAddress(
  maybeDuckAddress: string,
  maybeEmailAddress: string,
) {
  const parsedDuckAddress = parseEmailAddress(maybeDuckAddress);
  const parsedAddress = parseEmailAddress(maybeEmailAddress);

  if (parsedAddress === null || parsedDuckAddress === null) {
    return null;
  }

  const { local, domain } = parsedAddress;

  if (domain.tokens.includes("_at_")) {
    return null;
  }

  return `${local}_at_${domain}_${maybeDuckAddress}`;
}

export { convertMailAddress };
