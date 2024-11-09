import CartNavItem from '../nav/cart-nav-item'

export default function CartQuickAction({ onlyIcon }: { onlyIcon?: boolean }) {
  return (
    <div className="h-14 flex items-center justify-center px-4">
      <CartNavItem onlyIcon={onlyIcon} />
    </div>
  )
}
