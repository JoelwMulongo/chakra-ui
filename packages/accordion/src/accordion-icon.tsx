import { Icon, IconProps } from "@chakra-ui/icon"
import { SystemStyleObject } from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import {
  useAccordionItemContext,
  useAccordionStyles,
} from "./accordion-context"
import { useAccordionContext } from "./use-accordion"

/**
 * AccordionIcon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */

export function AccordionIcon(props: IconProps) {
  const { isOpen, isDisabled } = useAccordionItemContext()
  const { reduceMotion } = useAccordionContext()

  const _className = cx("chakra-accordion__icon", props.className)
  const styles = useAccordionStyles()

  const iconStyles: SystemStyleObject = {
    opacity: isDisabled ? 0.4 : 1,
    transform: isOpen ? "rotate(-180deg)" : undefined,
    transition: reduceMotion ? undefined : "transform 0.2s",
    transformOrigin: "center",
    ...styles.icon,
  }

  return (
    <Icon
      viewBox="0 0 24 24"
      aria-hidden
      className={_className}
      __css={iconStyles}
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  )
}
if (__DEV__) {
  AccordionIcon.displayName = "AccordionIcon"
}
