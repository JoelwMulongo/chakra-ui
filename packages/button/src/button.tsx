import { useMergeRefs } from "@chakra-ui/hooks"
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  omitThemingProps,
  SystemStyleObject,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/system"
import { cx, dataAttr, mergeWith, __DEV__ } from "@chakra-ui/utils"
import { useMemo } from "react"
import { useButtonGroup } from "./button-context"
import { ButtonIcon } from "./button-icon"
import { ButtonSpinner } from "./button-spinner"
import { ButtonOptions } from "./button-types"
import { useButtonType } from "./use-button-type"

export interface ButtonProps
  extends HTMLChakraProps<"button">,
    ButtonOptions,
    ThemingProps<"Button"> {}

export const Button = forwardRef<ButtonProps, "button">((props, ref) => {
  const group = useButtonGroup()
  const styles = useStyleConfig("Button", { ...group, ...props })

  const {
    isDisabled = group?.isDisabled,
    isLoading,
    isActive,
    children,
    leftIcon,
    rightIcon,
    loadingText,
    iconSpacing = "0.5rem",
    type,
    spinner,
    spinnerPlacement = "start",
    className,
    as,
    ...rest
  } = omitThemingProps(props)

  /**
   * When button is used within ButtonGroup (i.e. flushed with sibling buttons),
   * it is important to add a `zIndex` on focus.
   *
   * So let's read the component styles and then add `zIndex` to it.
   */
  const buttonStyles: SystemStyleObject = useMemo(() => {
    // @ts-ignore
    const _focus = mergeWith({}, styles?.["_focus"] ?? {}, { zIndex: 1 })
    return {
      display: "inline-flex",
      appearance: "none",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
      position: "relative",
      whiteSpace: "nowrap",
      verticalAlign: "middle",
      outline: "none",
      ...styles,
      ...(!!group && { _focus }),
    }
  }, [styles, group])

  const { ref: _ref, type: defaultType } = useButtonType(as)

  const contentProps = { rightIcon, leftIcon, iconSpacing, children }

  return (
    <chakra.button
      disabled={isDisabled || isLoading}
      ref={useMergeRefs(ref, _ref)}
      as={as}
      type={type ?? defaultType}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      __css={buttonStyles}
      className={cx("chakra-button", className)}
      {...rest}
    >
      {isLoading && spinnerPlacement === "start" && (
        <ButtonSpinner
          className="chakra-button__spinner--start"
          label={loadingText}
          placement="start"
          spacing={iconSpacing}
        >
          {spinner}
        </ButtonSpinner>
      )}

      {isLoading ? (
        loadingText || (
          <chakra.span opacity={0}>
            <ButtonContent {...contentProps} />
          </chakra.span>
        )
      ) : (
        <ButtonContent {...contentProps} />
      )}

      {isLoading && spinnerPlacement === "end" && (
        <ButtonSpinner
          className="chakra-button__spinner--end"
          label={loadingText}
          placement="end"
          spacing={iconSpacing}
        >
          {spinner}
        </ButtonSpinner>
      )}
    </chakra.button>
  )
})

if (__DEV__) {
  Button.displayName = "Button"
}

type ButtonContentProps = Pick<
  ButtonProps,
  "leftIcon" | "rightIcon" | "children" | "iconSpacing"
>

function ButtonContent(props: ButtonContentProps) {
  const { leftIcon, rightIcon, children, iconSpacing } = props
  return (
    <>
      {leftIcon && <ButtonIcon marginEnd={iconSpacing}>{leftIcon}</ButtonIcon>}
      {children}
      {rightIcon && (
        <ButtonIcon marginStart={iconSpacing}>{rightIcon}</ButtonIcon>
      )}
    </>
  )
}
