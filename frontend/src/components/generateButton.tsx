"use client";

import { Button } from "@nextui-org/react";

interface GenerateButtonProps {
  onGenerate: () => void;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({ onGenerate }) => {
  return (
    <div className="pb-4">
      <Button color="primary" onClick={onGenerate}>
        Generate!
      </Button>
    </div>
  );
};

export default GenerateButton;
