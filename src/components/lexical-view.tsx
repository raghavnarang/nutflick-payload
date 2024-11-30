import styles from '@/lexical.module.css'
import clsx from 'clsx'

export default function LexicalView({
  htmlString,
  className,
}: {
  htmlString: string
  className?: string
}) {
  return (
    <div
      className={clsx(className, styles.body)}
      dangerouslySetInnerHTML={{ __html: htmlString }}
    />
  )
}
