function BoutonPrimaire({ children, ...props }) {
  return (
    <button
      className="bg-emerald-600 text-white rounded-xl px-5 py-2.5 font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50"
      {...props}
    >
      {children}
    </button>
  );
}

export default BoutonPrimaire;