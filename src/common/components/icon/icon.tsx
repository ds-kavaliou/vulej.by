import { icons } from 'lucide-react' // or lucide (web version)
import { LucideProps } from 'lucide-react'

export type LucideIconName = keyof typeof icons

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: LucideIconName
}

export const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = icons[name]

  if (!LucideIcon) {
    console.warn(`Lucide icon "${name}" not found`)
    return null
  }

  return <LucideIcon {...props} />
}
