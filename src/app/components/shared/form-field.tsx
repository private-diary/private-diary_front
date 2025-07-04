import { FormFieldProps } from "@/types/shared.type";

export default function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
