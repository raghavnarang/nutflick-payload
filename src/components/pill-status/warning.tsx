export default function WarningStatusPill({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full text-xs font-bold py-0.5 px-3 bg-yellow-100 text-yellow-600">
      {text}
    </span>
  )
}
