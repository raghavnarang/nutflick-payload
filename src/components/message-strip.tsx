export default function MessageStrip({ message }: { message: string }) {
  return <div className="bg-primary text-white text-center !leading-10 font-semibold md:text-base text-sm">{message}</div>
}
