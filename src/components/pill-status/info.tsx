export default function InfoStatusPill({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full text-xs font-bold py-0.5 px-3 bg-blue-100 text-blue-600">
      {text}
    </span>
  )
}
