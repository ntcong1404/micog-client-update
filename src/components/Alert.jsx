function Alert({ title, desc }) {
  return (
    <div
      className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300"
      role="alert"
    >
      <span className="font-semibold">{title}</span> {desc}
    </div>
  );
}

export default Alert;
