import { Button } from "./Button";

type FormProps = {
  title?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
  submitLabel?: string;
  isLoading?: boolean;
  className?: string;
  disableSubmit?: boolean;
};

export const Form = ({ title, onSubmit, children, submitLabel = "Submit", isLoading = false, disableSubmit = false, className = "" }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-4 rounded border p-6 shadow-sm bg-white ${className}`}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {children}
      <div className="pt-2">
        <Button
          type="submit"
          actionType={submitLabel === "Update" ? "edit" : submitLabel == "Create" ? "add" : "submit"}
          label={isLoading ? "Processing..." : submitLabel}
          disabled={isLoading || disableSubmit}
        />
      </div>
    </form>
  );
};
