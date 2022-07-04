import { useCallback, useEffect, useState } from "react";

interface ICheckboxCard {
  checked: boolean;
  name: string;
}

function CheckboxCard(props: ICheckboxCard) {
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const handleChange = useCallback((value: boolean) => {
    setChecked(() => !checked);
  }, []);

  return (
    <>
      <input
        type="checkbox"
        name="checkbox"
        id="checkbox"
        checked={checked}
        onChange={() => handleChange}
      />
      {props.name}
    </>
  );
}

export default CheckboxCard;
