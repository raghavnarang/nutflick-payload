import LoadingAnimated from "@/components/Icons/loading-animated";
import BigMessage from "@/components/big-message";

const TransactionProgress = () => (
  <BigMessage icon={LoadingAnimated}>
    Do not press back or close browser. Transaction is in progress.
  </BigMessage>
);

export default TransactionProgress;