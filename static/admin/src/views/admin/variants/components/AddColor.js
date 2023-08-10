import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";

export default function AddColor({ onChange }) {
  const [first, onFirst] = useState("");
  const [second, onSecond] = useState("");
  useEffect(() => {
    onChange({
      title: first,
      color: second,
    });
  }, [first, second]);
  const handleChangeComplete = (color) => {
    onSecond(color.hex);
  };

  return (
    <div>
      <div>
        <div className="mediumText mb-2">Color Title</div>
        <Input
          value={first}
          onChange={(e) => onFirst(e.target.value)}
          placeholder="eg. Red/Blue"
        />
      </div>
      <div className="mt-4">
        <div className="mediumText mb-2">Pick a Color</div>
        <div className="flex ">
          <SketchPicker
            color={second}
            onChangeComplete={handleChangeComplete}
          />
          <div
            style={{
              backgroundColor: second,
            }}
            className={`h-6 w-6 ml-4`}
          />
        </div>
      </div>
    </div>
  );
}
