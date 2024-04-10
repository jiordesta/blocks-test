import { useState, ChangeEvent } from "react";
import { Block } from "../utils/blocks";

interface ImageProps {
  block: Block;
}

export default function Image({ block }: ImageProps) {
  const { id, options } = block;
  const [sample, setSample] = useState<File | null>(null);
  return (
    <div id={id} style={options}>
      {sample ? (
        <img src="/images/sample_image1.jpg" />
      ) : (
        <input
          type="file"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length > 0) {
              const file = e.target.files[0];
              setSample(file);
            }
          }}
        />
      )}
    </div>
  );
}
