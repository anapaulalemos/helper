import React, { useCallback, useEffect, useState } from 'react';
import BarbellGender from './components/barbell-gender';
import BarbellList from './components/barbell-list';
import { Center, VStack, Box, Button, HStack, Text } from '@chakra-ui/react';
import logo from './capivaras.png';

import './App.css';

const barbellListKg: { [key: string]: number } = {
  '1': 0,
  '1.25': 0,
  '2.2': 0,
  '2.5': 0,
  '4.5': 0,
  '5': 0,
  '11.3': 0,
  '15': 0,
  '15.9': 0,
  '20.4': 0,
  '25': 0,
};

const barbellGender: { [key: string]: number } = {
  female: 15,
  male: 20,
};

const POUND = 2.20462;

function App() {
  const [total, setTotal] = useState(0);
  const [totalLb, setTotalLb] = useState(0);
  const [gender, setGender] = useState('female');
  const [barbells, setBarbells] = useState(barbellListKg);

  const onHandleClick = (key: string, operation = 'add') => {
    setBarbells((prevState) => ({
      ...prevState,
      [key]: barbells[key] + (operation === 'add' ? 1 : -1),
    }));
  };

  const calculateTotal = useCallback(() => {
    const defaultKg = barbellGender[gender];

    const sum = Object.entries(barbells).reduce((prev, [key, value]) => {
      return prev + Number(key) * value;
    }, defaultKg);

    setTotal(sum);
    setTotalLb(sum * POUND);
  }, [barbells, gender]);

  const clearTotal = () => {
    setBarbells(barbellListKg);
  };

  useEffect(() => {
    calculateTotal();
  }, [barbells, calculateTotal, gender]);

  return (
    <>
      <main>
        <VStack mt={2}>
          <img src={logo} width={75} height={75} alt="Capivaras" />
          <BarbellGender gender={gender} setGender={setGender} />
          <Box h={5} />
          <BarbellList barbells={barbells} onHandleClick={onHandleClick} />
          <Box h={5} />
          <Text fontWeight="bold" fontSize={18}>
            Peso em quilos:
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
            <Center fontWeight="bold">{total.toFixed(2)}</Center>
          </Box>
          <Box h={3} />
          <Text fontWeight="bold" fontSize={18}>
            Peso em libras:
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
            <Center fontWeight="bold">{totalLb.toFixed(2)}</Center>
          </Box>
          <HStack>
            <Button mt={5} onClick={clearTotal}>
              Limpar
            </Button>
          </HStack>
        </VStack>
      </main>
    </>
  );
}

export default App;
