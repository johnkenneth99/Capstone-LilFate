import React, { useState } from "react";

export default function useBoolean(defaultValue) {
  const [bool, setBool] = useState(defaultValue);

  const toggle = () => {
    setBool((current) => !current);
  };

  const setTrue = () => {
    setBool(true);
  };

  const setFalse = () => {
    setBool(false);
  };

  return { bool, toggle, setBool, setTrue, setFalse };
}
