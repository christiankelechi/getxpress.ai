import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme"
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "dummy-client-id-for-development.apps.googleusercontent.com";



const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
     <GoogleOAuthProvider clientId={clientId}>
       <ChakraProvider theme={theme}>
         <ColorModeScript initialColorMode={theme.config.initialColorMode} />
           {/* <AuthContextProvider> */}
            <App/>
            {/* </AuthContextProvider> */}
        </ChakraProvider>
        </GoogleOAuthProvider>
     </QueryClientProvider>
  </StrictMode>,
)
