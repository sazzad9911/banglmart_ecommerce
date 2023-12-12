import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export default function AddSpecification({ onChange }) {
  const [first, onFirst] = useState("");
  const [second, onSecond] = useState("");
  useEffect(()=>{
    onChange({
        title:first,
        details:second
    })
  },[first,second])

  return (
    <div>
      <div>
        <div className="mediumText mb-2">Specification Title</div>
        <Input value={first} onChange={e=>onFirst(e.target.value)} placeholder="eg. Waterproof/ 2yrs service" />
      </div>
      <div className="mt-4">
        <div className="mediumText mb-2">Details</div>
        <Input value={second} onChange={e=>onSecond(e.target.value)} placeholder="eg. you can use into water" />
      </div>
    </div>
  );
}
