type RequiredLabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
};

export function RequiredMark() {
  return (
    <span className="ml-1 text-red-500" aria-hidden>
      *
    </span>
  );
}

export default function RequiredLabel({
  htmlFor,
  children,
  className = "",
}: RequiredLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={`block font-black text-white ${className}`}
    >
      {children}
      <RequiredMark />
    </label>
  );
}
