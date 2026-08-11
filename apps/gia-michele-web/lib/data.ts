import { createPublicSupabaseClient } from '@/lib/supabase/public'

export type ServiceTier = {
  id: string
  title: string
  price_display: string
  description: string
  sort_order: number
}

export type PortfolioAsset = {
  id: string
  title: string
  location: string | null
  image_url: string
  category: string | null
  is_featured: boolean
}

const fallbackServices: ServiceTier[] = [
  {
    id: 'consultation',
    title: 'Design Consultation',
    price_display: 'From $1,000',
    description: 'Focused design direction, priorities, and a refined path forward for your space.',
    sort_order: 10,
  },
  {
    id: 'room-design',
    title: 'Room Design',
    price_display: 'From $2,000',
    description: 'A complete room concept balancing function, materiality, proportion, and quiet luxury.',
    sort_order: 20,
  },
  {
    id: 'whole-home',
    title: 'Whole Home Design',
    price_display: '$10,000–$25,000+',
    description: 'End-to-end residential design with a unified visual language and procurement strategy.',
    sort_order: 30,
  },
  {
    id: 'procurement',
    title: 'Procurement',
    price_display: 'By scope',
    description: 'Curated sourcing, ordering, vendor coordination, and white-glove delivery planning.',
    sort_order: 40,
  },
  {
    id: 'virtual-design',
    title: 'Virtual Design',
    price_display: 'By scope',
    description: 'Remote design direction for clients who want Gia Michèle perspective from anywhere.',
    sort_order: 50,
  },
]

export async function getServiceTiers(): Promise<ServiceTier[]> {
  const supabase = createPublicSupabaseClient()
  if (!supabase) return fallbackServices

  const { data, error } = await supabase
    .from('service_tiers')
    .select('id,title,price_display,description,sort_order')
    .order('sort_order', { ascending: true })

  if (error || !data?.length) return fallbackServices
  return data as ServiceTier[]
}

export async function getFeaturedPortfolio(): Promise<PortfolioAsset[]> {
  const supabase = createPublicSupabaseClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('portfolio_assets')
    .select('id,title,location,image_url,category,is_featured')
    .eq('is_featured', true)
    .order('title', { ascending: true })
    .limit(8)

  if (error) return []
  return (data ?? []) as PortfolioAsset[]
}
