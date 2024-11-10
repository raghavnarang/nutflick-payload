import AccountQuickAction from './account'
import CartQuickAction from './cart'
import QuickActionsContainer from './container'
import HomeQuickAction from './home'

export default function FooterQuickActions() {
  return (
    <QuickActionsContainer className="bg-white fixed bottom-0 left-0 right-0 md:hidden">
      <HomeQuickAction />
      <AccountQuickAction />
      <CartQuickAction hideIcon />
    </QuickActionsContainer>
  )
}
