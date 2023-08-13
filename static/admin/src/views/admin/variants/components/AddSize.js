import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function AddSize({ onChange }) {
  const [first, onFirst] = useState("");
  const [second, onSecond] = useState("");
  useEffect(()=>{
    onChange({
        title:first,
        cm:second
    })
  },[first,second])

  return (
    <div>
      <div>
        <div className="mediumText mb-2">Size Title</div>
        <Input value={first} onChange={e=>onFirst(e.target.value)} placeholder="eg. Xl/XXL/M" />
      </div>
      <div className="mt-4">
        <div className="mediumText mb-2">Package Size</div>
        <Input value={second} onChange={e=>onSecond(e.target.value)} placeholder="eg. 36 cm/450gm/33kg" />
      </div>
    </div>
  );
}
