import { Briefcase, Building2, GraduationCap, Palmtree, Sparkles, Compass } from "lucide-react"

interface CategoryIconProps {
  category: string
  size?: number
  className?: string
}

export function CategoryIcon({ category, size = 24, className = "" }: CategoryIconProps) {
  switch (category) {
    case "career":
      return <Briefcase size={size} className={className} />
    case "business":
      return <Building2 size={size} className={className} />
    case "education":
      return <GraduationCap size={size} className={className} />
    case "travel":
      return <Palmtree size={size} className={className} />
    case "lifestyle":
      return <Sparkles size={size} className={className} />
    case "other":
    default:
      return <Compass size={size} className={className} />
  }
}
