import { extendTheme } from "@chakra-ui/react";

const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  };
  
  const colors = {
    gradientOne: 'linear-gradient(90deg, rgba(37,2,88,1) 14%, rgba(112,66,27,1) 54%, rgba(55,0,255,1) 100%)',
    grey: "#2B2B2B",
    darkGrey: "#1A1A1A",
    blue: "#48ADE0",
    green: "#27d882",
    themePurple: "#8227d8"
  };
  
  export const theme = extendTheme({ colors, config });