import * as Icons from "@/components/Icons";

interface Icon {
  className?: string;
}

type IconName = keyof typeof Icons;

export type { Icon, IconName };
