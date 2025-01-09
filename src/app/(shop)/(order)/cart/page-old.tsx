import CartClient from './client'

export const metadata = {
  title: 'Cart | Nutflick',
}

const Cart = () => (
  <div className="flex justify-center">
    <div className="max-w-7xl w-full">
      <h1 className="text-2xl mb-10">Cart</h1>
      <CartClient />
    </div>
  </div>
)

export default Cart
