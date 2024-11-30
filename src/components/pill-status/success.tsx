import clsx from 'clsx'

export default function SuccessStatusPill({ text, dark }: { text: string; dark?: boolean }) {
  return (
    <span
      className={clsx('inline-block rounded-full text-xs font-bold py-0.5 px-3 whitespace-nowrap', {
        'bg-green-700 text-white': dark,
        'bg-green-100 text-green-600': !dark,
      })}
    >
      {text}
    </span>
  )
}
