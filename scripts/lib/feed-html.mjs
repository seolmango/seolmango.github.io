import sanitizeHtml from 'sanitize-html';

const tags = [
  'p',
  'br',
  'hr',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'strong',
  'b',
  'em',
  'i',
  'del',
  's',
  'u',
  'sup',
  'sub',
  'blockquote',
  'ul',
  'ol',
  'li',
  'pre',
  'code',
  'kbd',
  'a',
  'img',
  'figure',
  'figcaption',
  'table',
  'thead',
  'tbody',
  'tr',
  'th',
  'td',
];
const safeWebUrl = (value) => /^https?:$/.test(new URL(value).protocol);

function resolve(value, baseUrl) {
  try {
    return new URL(value, baseUrl).href;
  } catch {
    return '';
  }
}

/** @param {string} html @param {string} baseUrl @param {{ allowSiteImages?: boolean, allowExternalLinks?: boolean }} [options] */
export function sanitizeFeedHtml(html, baseUrl, options = {}) {
  if (!html) return '';
  // Preserve a safe outbound link for embedded media before removing the embed.
  const withEmbeds = html.replace(
    /<iframe\b([^>]*)>(?:[\s\S]*?<\/iframe\s*>)?/gi,
    (_, attributes) => {
      const match = attributes.match(
        /\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
      );
      const url = resolve(
        match?.[1] ?? match?.[2] ?? match?.[3] ?? '',
        baseUrl,
      );
      if (!url || !safeWebUrl(url)) return '';
      return `<p><a href="${url.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}">삽입된 콘텐츠 보기</a></p>`;
    },
  );
  return sanitizeHtml(withEmbeds, {
    allowedTags: tags,
    allowedAttributes: {
      a: ['href', 'title', 'rel'],
      img: [
        'src',
        'alt',
        'title',
        'width',
        'height',
        'loading',
        'decoding',
        'referrerpolicy',
      ],
      code: ['class'],
      th: ['colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      h5: ['id'],
      h6: ['id'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedSchemesByTag: { img: ['http', 'https'] },
    allowProtocolRelative: false,
    transformTags: {
      h1: 'h2',
      a: (tagName, attribs) => {
        if (options.allowExternalLinks === false) return { tagName: 'span', attribs: {} };
        const href = attribs.href ? resolve(attribs.href, baseUrl) : '';
        const result = { ...attribs, href };
        if (/^https?:\/\//i.test(href)) result.rel = 'noopener noreferrer';
        else delete result.rel;
        return { tagName, attribs: result };
      },
      img: (tagName, attribs) => {
        const siteImage = options.allowSiteImages && /^\/(?!\/)/.test(attribs.src ?? '');
        const src = siteImage ? attribs.src : attribs.src ? resolve(attribs.src, baseUrl) : '';
        return {
          tagName,
          attribs: {
            ...attribs,
            src,
            loading: 'lazy',
            decoding: 'async',
            referrerpolicy: 'no-referrer',
          },
        };
      },
      code: (tagName, attribs) => ({
        tagName,
        attribs: /^language-[\w-]+$/.test(attribs.class ?? '')
          ? { class: attribs.class }
          : {},
      }),
    },
    exclusiveFilter: (frame) =>
      frame.tag === 'img' &&
      (!frame.attribs.src || !/^https?:\/\//i.test(frame.attribs.src) &&
        !(options.allowSiteImages && /^\/(?!\/)/.test(frame.attribs.src))),
  });
}

const namedEntities = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
};

/** Decodes the entities sanitize-html leaves in plain text. @param {string} text */
function decodeEntities(text) {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code[0] !== '#') return namedEntities[code.toLowerCase()] ?? entity;
    const point =
      code[1].toLowerCase() === 'x'
        ? parseInt(code.slice(2), 16)
        : parseInt(code.slice(1), 10);
    return Number.isInteger(point) && point >= 0 && point <= 0x10ffff
      ? String.fromCodePoint(point)
      : entity;
  });
}

/** @param {string} html @param {number} [maxLength] */
export function htmlToExcerpt(html, maxLength = 140) {
  // Code blocks and figure captions read poorly in a one-line summary, so leave them out.
  const prose = (html ?? '').replace(/<(pre|figure|table)\b[\s\S]*?<\/\1\s*>/gi, ' ');
  const spaced = prose.replace(
    /<\/?(?:p|br|hr|h[1-6]|blockquote|li|ul|ol|pre|figure|figcaption|tr|td|th)\b[^>]*>/gi,
    ' ',
  );
  const plain = decodeEntities(
    sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} }),
  )
    .replace(/\s+/g, ' ')
    .trim();
  const chars = [...plain];
  return chars.length > maxLength
    ? chars.slice(0, Math.max(0, maxLength)).join('').trimEnd() + '…'
    : plain;
}
