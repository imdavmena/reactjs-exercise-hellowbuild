export default function (
  { label, name, placeholder, type, onChange, classContent },
  props
) {
  return (
    <div className={`${classContent} mt-2`}>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={name}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}
