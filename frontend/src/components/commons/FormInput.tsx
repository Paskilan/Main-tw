import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


export default function FormInput({
  label = "",
  divClassName = "grid gap-2",
  labelClassName = "", 
  inputClassName = "", 
  ...inputProps 
}: {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  [key: string]: any; 
}) {
  return (
    <div className={divClassName}>
      <Label className={labelClassName} htmlFor={inputProps.id}>
        {label}
      </Label>
      <Input className={inputClassName} {...inputProps} />
    </div>
  );
}
