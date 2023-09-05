import React, { useState } from "react";

export default function useBoolean(defaultValue) {
  const [bool, setBool] = useState(defaultValue);

  const toggle = () => {
    setBool((current) => !current);
  };
  return { bool, toggle, setBool };
}
