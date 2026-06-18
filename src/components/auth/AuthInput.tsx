type Props = {
  field: {
    name: string;
    type: string;
    placeholder: string;
  };
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function AuthInput({ field, value, onChange }: Props) {
  return (
    <input
      name={field.name}
      type={field.type}
      placeholder={field.placeholder}
      value={value || ""}
      onChange={onChange}
      className="w-full mb-3 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  );
}

