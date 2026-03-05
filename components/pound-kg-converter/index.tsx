import {
  RadioGroup,
  Stack,
  Radio,
  Text,
  Input,
  VStack,
  Box,
  Button,
  Center,
} from '@chakra-ui/react';
import { useState, useEffect, useCallback } from 'react';
import { POUND_TO_KG_RATIO } from '@/constants/conversions';

type ConversionType = 'lb-to-kg' | 'kg-to-lb';

interface ConversionMode {
  value: ConversionType;
  inputLabel: string;
  outputLabel: string;
}

const conversionModes: Record<ConversionType, ConversionMode> = {
  'lb-to-kg': {
    value: 'lb-to-kg',
    inputLabel: 'Peso em libras:',
    outputLabel: 'Resultado em quilos:',
  },
  'kg-to-lb': {
    value: 'kg-to-lb',
    inputLabel: 'Peso em quilos:',
    outputLabel: 'Resultado em libras:',
  },
};

const PoundKgConverter: React.FC = () => {
  const [result, setResult] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [mode, setMode] = useState<ConversionType>('lb-to-kg');

  const getConversionResult = useCallback(
    (value: number, conversionType: ConversionType): number => {
      if (conversionType === 'kg-to-lb') {
        return value * POUND_TO_KG_RATIO;
      } else {
        return value / POUND_TO_KG_RATIO;
      }
    },
    [],
  );

  const calculateConversion = useCallback(() => {
    const numericValue = parseFloat(inputValue);
    if (isNaN(numericValue)) {
      setResult(0);
      return;
    }

    setResult(getConversionResult(numericValue, mode));
  }, [inputValue, mode, getConversionResult]);

  const clearFields = () => {
    setInputValue('');
    setResult(0);
  };

  useEffect(() => {
    calculateConversion();
  }, [calculateConversion]);

  const currentMode = conversionModes[mode];

  return (
    <VStack mt={2} spacing={4}>
      <Text fontWeight="bold" fontSize={18}>
        Conversor de Peso:
      </Text>

      <RadioGroup
        onChange={(value: ConversionType) => setMode(value)}
        value={mode}
      >
        <Stack direction="column">
          <Radio value="lb-to-kg">Libras → Quilos</Radio>
          <Radio value="kg-to-lb">Quilos → Libras</Radio>
        </Stack>
      </RadioGroup>

      <Box h={3} />

      <Text fontWeight="bold" fontSize={16}>
        {currentMode.inputLabel}
      </Text>

      <Input
        w={200}
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="0"
        textAlign="center"
      />

      <Box h={3} />

      <Text fontWeight="bold" fontSize={16}>
        {currentMode.outputLabel}
      </Text>

      <Box
        w={200}
        justifyContent="center"
        flex={1}
        fontSize="xl"
        border="2px"
        borderColor="teal"
        borderRadius={4}
        p={2}
      >
        <Center fontWeight="bold">{result.toFixed(2)}</Center>
      </Box>

      <Button mt={4} onClick={clearFields}>
        Limpar
      </Button>
    </VStack>
  );
};

export default PoundKgConverter;
