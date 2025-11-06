import siteDataRaw from '/site_data.md?raw';

const extractFirstJsonObject = (input = '') => {
  const trimmed = input.trim();
  if (!trimmed.startsWith('{')) {
    return '';
  }

  let depth = 0;
  let inString = false;
  let isEscaped = false;

  for (let index = 0; index < trimmed.length; index += 1) {
    const character = trimmed[index];

    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (character === '\\') {
        isEscaped = true;
      } else if (character === '"') {
        inString = false;
      }
      continue;
    }

    if (character === '"') {
      inString = true;
      continue;
    }

    if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth === 0) {
        return trimmed.slice(0, index + 1);
      }
    }
  }

  return '';
};

const safeParse = (input) => {
  if (typeof input !== 'string') {
    return {};
  }

  const trimmed = input.trim();
  if (!trimmed) {
    return {};
  }

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    const candidate = extractFirstJsonObject(trimmed);
    if (candidate) {
      try {
        return JSON.parse(candidate);
      } catch (nestedError) {
        console.warn('Unable to parse extracted site data:', nestedError);
      }
    }
    console.warn('Unable to parse site data:', error);
    return {};
  }
};

const sanitizeText = (value = '') =>
  value
    .replace(/\u00a0/g, ' ')
    .replace(/\u2019/g, "'")
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u00a9/g, '(c)')
    .replace(/⟨\d+⟩/g, '')
    .replace(/[\[\]]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[^\x00-\x7F]/g, '');

const parsed = safeParse(siteDataRaw);
const markdownBlock = parsed.markdown ?? {};
const markdownContent = markdownBlock.markdown_with_citations ?? '';
const referencesContent = markdownBlock.references_markdown ?? '';

const markdownLines = markdownContent
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0);

const imageEntries = [];
for (const line of markdownLines) {
  const imageMatches = line.matchAll(/!\[(.*?)\](?:\((.*?)\))?/g);
  for (const match of imageMatches) {
    imageEntries.push({
      alt: sanitizeText(match[1] ?? ''),
      src: match[2] ?? '',
    });
  }
}

const shortLineCandidates = markdownLines.filter((line) => {
  if (line.startsWith('!') || line.startsWith('|') || line.includes('---')) {
    return false;
  }
  return line.length <= 40;
});

const uniqueShortLines = Array.from(
  new Set(shortLineCandidates.map((line) => sanitizeText(line)))
).filter((line) => line.length > 0);

const attorneys = uniqueShortLines.filter((line) =>
  /\bbertolino\b|\bdougherty\b/i.test(line)
);

const services = uniqueShortLines.filter((line) => /program|project/i.test(line));

const longFormParagraphs = markdownLines
  .filter((line) =>
    !line.startsWith('!') &&
    !line.startsWith('|') &&
    !line.includes('---') &&
    /[\.!?]/.test(line) &&
    line.length > 50
  )
  .map((line) => sanitizeText(line));

const narrative = {
  intro: longFormParagraphs[0] ?? '',
  overview: longFormParagraphs.slice(1, -1),
  closing: longFormParagraphs.slice(-1),
};

const steerMatch = (narrative.overview[0] ?? '').match(
  /steer clients through the infinite grey areas confronting their business every day\.?/i
);

const heroTagline = steerMatch
  ? `Steering ${sanitizeText(steerMatch[0]).replace(/^steer\s+/i, '')}`
  : 'Business-Focused Counsel';

const referenceMap = {};
referencesContent
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line.startsWith('⟨'))
  .forEach((line) => {
    const match = line.match(/⟨(\d+)⟩\s+(https?:\/\/\S+):\s*(.+)/);
    if (match) {
      const [, key, url, label] = match;
      referenceMap[key] = {
        url,
        label: sanitizeText(label),
      };
    }
  });

const navLine = markdownLines.find((line) => line.startsWith('All Rights Reserved'));
const navMatches = navLine ? Array.from(navLine.matchAll(/([A-Za-z ]+)⟨(\d+)⟩/g)) : [];

const navLinks = navMatches.map((match) => {
  const [, labelText, key] = match;
  const reference = referenceMap[key] ?? {};
  return {
    label: sanitizeText(labelText),
    url: reference.url ?? '#',
  };
});

const designCredit = navLinks.find((item) => /scorpion design/i.test(item.label));
const legalNotice = navLinks.find((item) => /legal notice/i.test(item.label));

const addressReference = Object.values(referenceMap).find((item) =>
  /grey street legal/i.test(item.label ?? '')
);

const primaryNavLinks = navLinks.filter((item) =>
  !/scorpion design|legal notice/i.test(item.label)
);

const contactLink = navLinks.find((item) => /contact/i.test(item.label));

const pageTitleMatch = parsed.html?.match(/<title>(.*?)<\/title>/i);
const pageTitle = pageTitleMatch ? sanitizeText(pageTitleMatch[1]) : '';
const titleSegments = pageTitle.split('|').map((segment) => sanitizeText(segment));

const heroTitle = titleSegments[0] ?? '';
const heroSubtitle = titleSegments.slice(1).filter((segment) => segment.length > 0).join(' | ');

const heroImage = imageEntries.find((image) => image.src.includes('GreyStreet_05')) ?? imageEntries[0];
const galleryImages = imageEntries.filter((image) => image.src && image.src.includes('GreyStreet_'));
const addressImage = imageEntries.find((image) => /grey street legal/i.test(image.alt));

const copyrightLine = markdownLines
  .map((line) => sanitizeText(line))
  .find((line) => line.toLowerCase().startsWith('copyright')) ?? '';

export const siteCopy = {
  hero: {
    title: heroTitle,
    subtitle: heroSubtitle,
    intro: narrative.intro,
    tagline: heroTagline,
    ctas: contactLink && contactLink.label
      ? [
          {
            label: contactLink.label
              .split(' ')
              .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ''))
              .join(' '),
            url: contactLink.url,
          },
        ]
      : [],
    image: heroImage ?? null,
    gallery: galleryImages,
    attorneys,
  },
  about: {
    heading: `About ${heroTitle || 'Grey Street Legal'}`.trim(),
    paragraphs: narrative.overview,
  },
  closing: {
    paragraphs: narrative.closing,
    ctas: contactLink && contactLink.label
      ? [
          {
            label: contactLink.label
              .split(' ')
              .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ''))
              .join(' '),
            url: contactLink.url,
          },
        ]
      : [],
  },
  services,
  footer: {
    attorneys,
    services,
    navLinks: primaryNavLinks,
    designCredit: designCredit ?? null,
    legalNotice: legalNotice ?? null,
    address: addressImage?.alt || addressReference?.label || '',
    copyright: copyrightLine,
  },
  images: imageEntries,
};
