import PoundKgConverter from '@/components/pound-kg-converter';
import { VStack } from '@chakra-ui/react';

const ConvertersTab: React.FC = () => {
  return (
    <VStack mt={2}>
      <PoundKgConverter />
    </VStack>
  );
};

export default ConvertersTab;