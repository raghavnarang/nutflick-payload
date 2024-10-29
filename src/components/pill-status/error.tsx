export default function ErrorStatusPill({ text }: { text: string }) {
  return (
    <span className="inline-block rounded-full text-xs font-bold py-0.5 px-3 bg-red-100 text-red-600">
      {text}
    </span>
  )
}
