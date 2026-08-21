import { Button } from "@chakra-ui/react";
import { forwardRef } from "react";

const CustomButton = forwardRef(
  (
    {
      title,
      leftIcon,
      rightIcon,
      children,
      onClick,
      isBgGradient= true,
      ...rest // Accepts all Button props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        bgGradient={`${isBgGradient ? "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.50) 50%, #718517 100%)" : null }`}
        color="white"
        _hover={{
          bgGradient:
            `${isBgGradient ? "linear(to-r, #173685 0%, rgba(23, 54, 133, 0.70) 50%, #718517 100%)" : null }`
        }}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onClick={onClick}
        {...rest}
      >
        {title || children}
      </Button>
    );
  }
);


CustomButton.displayName = "CustomButton";

export default CustomButton;
