import CartNavItem from '../nav/cart-nav-item'

export default function CartQuickAction(props: { hideIcon?: boolean; hideText?: boolean }) {
  return (
    <div className="h-14 flex items-center justify-center">
      <CartNavItem {...props} />
    </div>
  )
}
