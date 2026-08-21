import { extendTheme } from '@chakra-ui/react';
import { mode } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode("gray.50", "#0f121c")(props),  // Light Mode: gray.50, Dark Mode: #0f121c
        color: mode("gray.800", "gray.50")(props), // Light Mode: gray.800, Dark Mode: gray.50
      },
    }),
  },
  components: {
    Button: {
      baseStyle: (props) => ({
        // bg: props.colorMode === "light" ? "blue.400" : "blue.500",
        color: props.colorMode === "light" ? "white" : "gray.800",
        _hover: {
          bg: props.colorMode === "light" ? "blue.300" : "blue.200",
        },
      }),
    },
    Box: {
      baseStyle: {
        w: { base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
        maxW: "600px",
      },
    },
    Flex: {
      baseStyle: {
        w: { base: "full", sm: "80%", md: "60%", lg: "50%", xl: "40%" },
        maxW: "600px",
      },
    },
  },
  colors: {
    brand: {
      100: '#f7c8c8',
      900: '#1a202c',
    },
  },
});

export default theme;
