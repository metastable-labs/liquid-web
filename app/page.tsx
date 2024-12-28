'use client';

import { useState } from 'react';
import { Button } from './components/ui/button';
import { WithdrawModal } from './components/withdraw-modal';
import { InvestModal } from './components/invest-modal';
import { ClaimModal } from './components/claim-modal';
import { InfoModal } from './components/Info-modal';
import ActionsModal from './components/actions-modal';

const position = {
  name: 'Moonwell - USDC',
  apy: 101.45,
  totalBalance: 10000,
  yieldEarned: 356.14,
  rewards: 400,
  icons: [
    'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png',
    'https://res.cloudinary.com/djzeufu4j/image/upload/v1732105634/tokenAIcon_jgy241.png',
  ],
};

export default function Home() {
  const [openWithdraw, setIsOpenWithdraw] = useState(false);
  const [openInvest, setIsOpenInvest] = useState(false);
  const [openClaim, setIsOpenClaim] = useState(false);
  const [openInfo, setIsOpenInfo] = useState(false);
  const [openActions, setIsOpenActions] = useState(false);

  return (
    <div className="">
      <Button onClick={() => setIsOpenWithdraw(true)}>
        Open Withdraw Modal
      </Button>
      <Button onClick={() => setIsOpenInvest(true)}>Open Invest Modal</Button>
      <Button onClick={() => setIsOpenClaim(true)}>Open Claim Modal</Button>
      <Button onClick={() => setIsOpenInfo(true)}>Open Info Modal</Button>
      <Button onClick={() => setIsOpenActions(true)}>Open Actions Modal</Button>

      <InvestModal
        isOpen={openInvest}
        onClose={() => setIsOpenInvest(false)}
        balance={3600}
        tokenSymbol="USDC"
      />

      <WithdrawModal
        isOpen={openWithdraw}
        onClose={() => setIsOpenWithdraw(false)}
        balance={10000}
        tokenSymbol="USDC"
      />

      <ClaimModal
        isOpen={openClaim}
        onClose={() => setIsOpenClaim(false)}
        balance={400}
        tokenSymbol="USDC"
      />

      <ActionsModal
        isOpen={openActions}
        onClose={() => setIsOpenActions(false)}
        position={position}
        onWithdraw={() => console.log('Withdraw clicked')}
        onClaimYield={() => console.log('Claim yield clicked')}
        onClaimRewards={() => console.log('Claim rewards clicked')}
      />

      <InfoModal
        isOpen={openInfo}
        onClose={() => setIsOpenInfo(false)}
        title="What’s your total balance?"
        description="Your total balance reflects the amount of money available in a particular position. It includes all deposits."
      />
    </div>
  );
}
