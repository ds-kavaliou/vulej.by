export function resolveImageUrl(
  path: string | null | undefined,
  options: {
    width?: number
    quality?: number
    bucket?: string
  } = {},
): string {
  if (!path) {
    return '/images/placeholder.webp'
  }

  const { width, quality = 100, bucket = 'vulej-by-assets' } = options

  const base = import.meta.env.VITE_SUPABASE_URL

  if (!base) {
    console.warn('VITE_SUPABASE_URL not set')
    return '/images/fallback.jpg'
  }

  const cleanPath = path.replace(/^\/+/, '')
  const url = new URL(`/storage/v1/object/public/${bucket}/${cleanPath}`, base)

  if (width) url.searchParams.set('width', width.toString())
  if (quality) url.searchParams.set('quality', quality.toString())

  return url.toString()
}
