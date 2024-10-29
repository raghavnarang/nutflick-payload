import ErrorStatusPill from './error'
import InfoStatusPill from './info'
import SuccessStatusPill from './success'
import WarningStatusPill from './warning'

export enum StatusPillType {
  SUCCESS,
  INFO,
  ERROR,
  WARNING,
}

export default function StatusPill({ text, type }: { text: string; type: StatusPillType }) {
  switch (type) {
    case StatusPillType.SUCCESS:
      return <SuccessStatusPill text={text} />
    case StatusPillType.WARNING:
      return <WarningStatusPill text={text} />
    case StatusPillType.INFO:
      return <InfoStatusPill text={text} />
    case StatusPillType.ERROR:
      return <ErrorStatusPill text={text} />
  }
}
