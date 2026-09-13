function BoutonPrimaire({ children, ...props }) {
  return (
    <button
      className="w-full bg-[#D85A30] text-[#FAECE7] rounded-lg py-2.5 text-sm font-semibold disabled:opacity-60"
      {...props}
    >
      {children}
    </button>
  );
}

export default BoutonPrimaire;