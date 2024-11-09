import AccountQuickAction from './account'
import CartQuickAction from './cart'
import QuickActionsContainer from './container'
import HomeQuickAction from './home'

export default function MobileQuickActions() {
  return (
    <QuickActionsContainer className="fixed bottom-0 left-0 right-0 md:hidden">
      <HomeQuickAction />
      <AccountQuickAction />
      <CartQuickAction onlyIcon />
    </QuickActionsContainer>
  )
}
