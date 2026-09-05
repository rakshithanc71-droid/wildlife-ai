// Embeds a map created in Google My Maps (mymaps.google.com).
// Get your embed URL from: My Maps → ≡ menu → "Embed on my site" → copy the src.
// Paste that src below.

const MY_MAP_EMBED_URL = 'https://www.google.com/maps/d/embed?mid=PASTE_YOUR_MAP_ID_HERE'

export default function GoogleMyMap({ height = 480, title = 'Wildlife Guardian Reserve Map' }) {
  return (
    <iframe
      title={title}
      src={MY_MAP_EMBED_URL}
      width="100%"
      height={height}
      style={{ border: 0, borderRadius: 'var(--radius-md)' }}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  )
}
