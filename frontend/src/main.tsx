// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css' // Manteremos por enquanto, mas o Chakra vai dominar

// 1. Importe o Chakra
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

// 2. Defina o tema com a fonte 'Inter'
const theme = extendTheme({
  fonts: {
    heading: `'Inter', sans-serif`,
    body: `'Inter', sans-serif`,
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
)