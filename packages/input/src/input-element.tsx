import {
  chakra,
  forwardRef,
  SystemStyleObject,
  HTMLChakraProps,
} from "@chakra-ui/system"
import { cx, __DEV__ } from "@chakra-ui/utils"
import { useInputGroupStyles } from "./input-group"

export interface InputElementProps extends HTMLChakraProps<"div"> {
  placement?: "left" | "right"
}

const StyledInputElement = chakra("div", {
  baseStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "0",
    zIndex: 2,
  },
})

const InputElement = forwardRef<InputElementProps, "div">(function InputElement(
  props,
  ref,
) {
  const { placement = "left", ...rest } = props

  const styles = useInputGroupStyles()
  const input: any = styles.field

  const attr = placement === "left" ? "insetStart" : "insetEnd"

  const elementStyles: SystemStyleObject = {
    [attr]: "0",
    width: input?.height ?? input?.h,
    height: input?.height ?? input?.h,
    fontSize: input?.fontSize,
    ...styles.element,
  }

  return <StyledInputElement ref={ref} __css={elementStyles} {...rest} />
})

// This is used in `input-group.tsx`
InputElement.id = "InputElement"

if (__DEV__) {
  InputElement.displayName = "InputElement"
}

export const InputLeftElement = forwardRef<InputElementProps, "div">(
  function InputLeftElement(props, ref) {
    const { className, ...rest } = props
    const _className = cx("chakra-input__left-element", className)

    return (
      <InputElement
        ref={ref}
        placement="left"
        className={_className}
        {...rest}
      />
    )
  },
)

// This is used in `input-group.tsx`
InputLeftElement.id = "InputLeftElement"

if (__DEV__) {
  InputLeftElement.displayName = "InputLeftElement"
}

export const InputRightElement = forwardRef<InputElementProps, "div">(
  function InputRightElement(props, ref) {
    const { className, ...rest } = props
    const _className = cx("chakra-input__right-element", className)

    return (
      <InputElement
        ref={ref}
        placement="right"
        className={_className}
        {...rest}
      />
    )
  },
)

// This is used in `input-group.tsx`
InputRightElement.id = "InputRightElement"

if (__DEV__) {
  InputRightElement.displayName = "InputRightElement"
}
