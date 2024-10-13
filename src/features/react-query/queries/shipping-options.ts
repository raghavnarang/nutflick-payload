'use client'

import { getShippingOptions } from '@/features/server/shipping'
import { useQuery } from '@tanstack/react-query'

const useShippingOptions = () =>
  useQuery({
    queryKey: ['shippingOptions'],
    queryFn: () => getShippingOptions(),
  })

export default useShippingOptions
