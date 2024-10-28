import LoadingAnimated from '@/components/Icons/loading-animated'

export default function OrderFetchingStatus() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-7 w-full">
      <LoadingAnimated className="text-red-500 !size-14" />
      <div className="text-center md:text-start">
        <p className="text-2xl">Fetching Payment Status</p>
        <p className="text-gray-500 text-sm">Fetching payment status from our payment provider</p>
      </div>
    </div>
  )
}
