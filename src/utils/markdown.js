// Tiny helper — makes replacements more readable (safe no-op abstraction)
const replaceAll = (str, regex, replacement) => str.replace(regex, replacement);

export function formatDescription(text) {
  if (!text) return { __html: "" };

  let html = text.trim();

  // Inline code blocks
  html = replaceAll(
    html,
    /`([^`]+)`/g,
    '<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">$1</code>'
  );

  // Bold (**text**)
  html = replaceAll(html, /\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Headings (### Title)
  html = replaceAll(
    html,
    /### (.*?)\n/g,
    '<h3 class="font-semibold mt-6 mb-2">$1</h3>\n'
  );

  // Newline → <br>
  html = replaceAll(html, /\n/g, "<br />");

  // Remove backticks left behind (final cleanup)
  html = replaceAll(html, /`/g, "");

  return { __html: html };
}
