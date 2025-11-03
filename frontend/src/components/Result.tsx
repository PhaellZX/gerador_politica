// src/components/Result.tsx

// 1. Importações do Chakra (temos muitas aqui!)
import {
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Link,
  Text,
  useToast,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Code,
  IconButton,
  HStack,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons'; // Ícone de copiar

// --- (Interface colada) ---
interface IPolicyOutput {
  policy: string;
  terms: string;
}
// -------------------------

interface ResultProps {
  results: IPolicyOutput | null;
  reset: () => void;
  data: Partial<IPolicyInput>;
}

export const Result: React.FC<ResultProps> = ({ results, reset, data }) => {
  const toast = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Texto copiado!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  if (!results) {
    // ... (código de erro)
  }

  // 2. Layout com Alerta de Afiliado e Abas
  return (
    <VStack spacing={6} align="stretch">
      {/* 3. Alerta de Afiliado Principal (bem chamativo) */}
      <Alert
        status="success"
        variant="solid"
        borderRadius="md"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        p={6}
      >
        <HStack spacing={4} mb={{ base: 4, md: 0 }}>
          <AlertIcon boxSize="40px" />
          <Box>
            <AlertTitle fontSize="xl" fontWeight="bold">
              Parabéns pela sua Política! E agora?
            </AlertTitle>
            <AlertDescription>
              Garanta que seu site esteja em uma hospedagem rápida e segura.
            </AlertDescription>
          </Box>
        </HStack>
        <Button
          as={Link}
          href="#LINK-AFILIADO-HOSTINGER" // <-- TROQUE AQUI
          isExternal
          colorScheme="yellow"
          variant="outline"
          bg="white"
          color="gray.800"
          _hover={{ bg: 'gray.100' }}
          size="lg"
          flexShrink={0}
        >
          Contrate Hostinger com 55% OFF
        </Button>
      </Alert>

      {/* --- ALERTA CONDICIONAL PARA E-COMMERCE --- */}
      {results && data.collects_payment_data && ( // 'data' precisa ser passado como prop
        <Alert
          status="info"
          variant="subtle" // Um visual mais suave
          borderRadius="md"
          mt={6} // Margem superior
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          p={6}
        >
          <HStack spacing={4} mb={{ base: 4, md: 0 }}>
            <AlertIcon boxSize="40px" />
            <Box>
              <AlertTitle fontSize="xl" fontWeight="bold">
                Você vende produtos online?
              </AlertTitle>
              <AlertDescription>
                Receba pagamentos de forma fácil e profissional. Crie sua loja
                virtual na Nuvemshop.
              </AlertDescription>
            </Box>
          </HStack>
          <Button
            as={Link}
            href="#LINK-AFILIADO-NUVEMSHOP" // <-- TROQUE AQUI
            isExternal
            colorScheme="blue"
            variant="solid"
            size="lg"
            flexShrink={0}
            mt={{ base: 4, md: 0 }}
          >
            Comece na Nuvemshop
          </Button>
        </Alert>
      )}

      {/* 4. Abas para Política e Termos */}
      <Tabs isFitted variant="enclosed" colorScheme="blue">
        <TabList>
          <Tab _selected={{ color: 'blue.600', bg: 'blue.50' }}>
            <Heading size="md">Sua Política de Privacidade</Heading>
          </Tab>
          <Tab _selected={{ color: 'blue.600', bg: 'blue.50' }}>
            <Heading size="md">Seus Termos de Uso</Heading>
          </Tab>
        </TabList>

        <TabPanels bg="white" borderWidth="1px" borderColor="gray.200" borderRadius="0 0 md md">
          <TabPanel>
            <HStack justify="flex-end" mb={4}>
              <Button
                leftIcon={<CopyIcon />}
                onClick={() => copyToClipboard(results!.policy)}
              >
                Copiar Política
              </Button>
            </HStack>
            <Code
              display="block"
              whiteSpace="pre-wrap"
              p={5}
              borderRadius="md"
              bg="gray.50"
              color="gray.800"
            >
              {results!.policy}
            </Code>
          </TabPanel>
          <TabPanel>
            <HStack justify="flex-end" mb={4}>
              <Button
                leftIcon={<CopyIcon />}
                onClick={() => copyToClipboard(results!.terms)}
              >
                Copiar Termos
              </Button>
            </HStack>
            <Code
              display="block"
              whiteSpace="pre-wrap"
              p={5}
              borderRadius="md"
              bg="gray.50"
              color="gray.800"
            >
              {results!.terms}
            </Code>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Button onClick={reset} size="lg" variant="outline">
        Gerar Novo
      </Button>
    </VStack>
  );
};