'use client';

import { Button } from "@nextui-org/react";

interface GenerateButtonProps {
  onGenerate: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onGenerate }) => {
  return (
    <Button color="primary" onClick={onGenerate}>
      Generate!
    </Button>
  );
};

export default GenerateButton;
