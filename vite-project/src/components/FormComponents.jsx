import { AlertCircle } from 'lucide-react';

export function FormField({ label, error, children, required = false }) {
  return (
    <div className="mb-4">
      <label className={`block text-sm font-semibold mb-2 ${error ? 'text-red-700' : 'text-slate-700'}`}>
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
      {error && (
        <div className="flex items-center gap-1 text-red-600 text-sm mt-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  );
}

export function FormInput({ error, ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
        error
          ? 'border-red-500 focus:border-red-600'
          : 'border-slate-300 focus:border-blue-500'
      }`}
    />
  );
}

export function FormSelect({ error, options, ...props }) {
  return (
    <select
      {...props}
      className={`w-full px-4 py-2 border-2 rounded-lg focus:outline-none transition ${
        error
          ? 'border-red-500 focus:border-red-600'
          : 'border-slate-300 focus:border-blue-500'
      }`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
