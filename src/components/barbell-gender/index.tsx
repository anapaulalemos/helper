import { RadioGroup, Stack, Radio } from '@chakra-ui/react';

interface BarbellGenderProps {
  setGender: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
}

const BarbellGender: React.FC<BarbellGenderProps> = ({ setGender, gender }) => {
  return (
    <RadioGroup onChange={setGender} value={gender}>
      <Stack direction="row">
        <Radio value="female">Barra feminina</Radio>
        <Radio value="male">Barra masculina</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default BarbellGender;
