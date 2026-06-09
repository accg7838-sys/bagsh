// Convert Mongolian Cyrillic text to Latin slug
export function generateSlug(name: string): string {
  const cyrillicToLatin: Record<string, string> = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'ye', ё: 'yo',
    ж: 'j', з: 'z', и: 'i', й: 'i', к: 'k', л: 'l', м: 'm',
    н: 'n', о: 'o', ө: 'u', п: 'p', р: 'r', с: 's', т: 't',
    у: 'u', ү: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh',
    щ: 'sh', ъ: '', ы: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya',
    А: 'a', Б: 'b', В: 'v', Г: 'g', Д: 'd', Е: 'ye', Ё: 'yo',
    Ж: 'j', З: 'z', И: 'i', Й: 'i', К: 'k', Л: 'l', М: 'm',
    Н: 'n', О: 'o', Ө: 'u', П: 'p', Р: 'r', С: 's', Т: 't',
    У: 'u', Ү: 'u', Ф: 'f', Х: 'h', Ц: 'ts', Ч: 'ch', Ш: 'sh',
    Щ: 'sh', Ъ: '', Ы: 'i', Ь: '', Э: 'e', Ю: 'yu', Я: 'ya',
  };

  let slug = '';
  for (const char of name) {
    slug += cyrillicToLatin[char] ?? char;
  }

  slug = slug
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');

  return slug || 'teacher';
}
