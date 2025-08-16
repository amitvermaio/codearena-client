export function formatDescription(text) {
  if (!text) return { __html: "" };
  const html = text
    .replace(
      /`([^`]+)`/g,
      '<code class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">$&</code>'
    )
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/### (.*?)\n/g, '<h3 class="font-semibold mt-6 mb-2">$1<\/h3>\n')
    .replace(/\n/g, "<br />");

  return { __html: html.replace(/`/g, "") };
}