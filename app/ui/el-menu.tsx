export default function ElMenu({children}: {children: React.ReactNode}) {
  // We don't need to check the toggled state here anymore
  // as the parent ElDropdown now handles showing/hiding based on toggle state
  return (
    <div className="py-1">
      {children}
    </div>
  )
}