import { Text, IconButton, Flex, Box } from '@chakra-ui/react';
import { FC } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

interface BarbellListProps {
  barbells: { [key: string]: number };
  onHandleClick: (key: string, operation?: string) => void;
}

const BarbellList: FC<BarbellListProps> = ({ barbells, onHandleClick }) => {
  return (
    <>
      {Object.entries(barbells)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([key, value]) => (
          <Flex key={key} w={240} align="center">
            <Text p={1} w={20}>
              {key} kg:
            </Text>
            <Box
              p={1}
              flex={1}
              border="2px solid teal"
              mr={2.5}
              textAlign="center"
              borderRadius={2}
            >
              {value}
            </Box>
            <IconButton
              flex={1}
              onClick={() => onHandleClick(key)}
              aria-label="add"
              icon={<AddIcon />}
              mr={1}
            />
            <IconButton
              flex={1}
              onClick={() => onHandleClick(key, 'sub')}
              aria-label="minus"
              icon={<MinusIcon />}
              isDisabled={value === 0}
            />
          </Flex>
        ))}
    </>
  );
};

export default BarbellList;
