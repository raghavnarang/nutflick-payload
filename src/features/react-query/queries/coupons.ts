'use client'

import { getCheckoutCoupons } from '@/features/server/coupon'
import { useQuery } from '@tanstack/react-query'

const useFetchCoupons = () =>
  useQuery({
    queryKey: ['coupons'],
    queryFn: () => getCheckoutCoupons(),
  })

export default useFetchCoupons
