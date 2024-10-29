export default function SuccessStatusPill({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full text-xs font-bold py-0.5 px-3 bg-green-100 text-green-600">
      {text}
    </span>
  )
}
