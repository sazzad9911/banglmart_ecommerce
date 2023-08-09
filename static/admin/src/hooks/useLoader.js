import { useState, useEffect } from "react";

function useLoader() {
  const [state, setState] = useState(false);
  const show = () => {
    setState(true);
  };
  const hide = () => {
    setState(false);
  };
  useEffect(() => {
    
  }, [state]);
  return [state, show, hide];
}
export default useLoader;
