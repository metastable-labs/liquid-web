'use client';
import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import ChessPiece from '@/assets/chess-piece';
import { ArrowLeftIcon, ArrowRightIcon } from '@/public/icons';
import { LWClickAnimation } from '@/components';
import { appearAnimation } from '@/utils/helpers';
import { positions, strategies } from './dummy';
import StrategyPaper from './strategy-paper';
import StrategyDetail from './strategy-detail';
import { Button } from '@/components/ui/button';
import { InvestModal } from '@/components/modal/invest-modal';
import { WithdrawModal } from '@/components/modal/withdraw-modal';
import { ClaimModal } from '@/components/modal/claim-modal';
import ActionsModal from '@/components/modal/actions-modal';
import { InfoModal } from '@/components/modal/Info-modal';

const Strategies = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(
    null,
  );

  const [openWithdraw, setIsOpenWithdraw] = useState(false);
  const [openInvest, setIsOpenInvest] = useState(false);
  const [openClaim, setIsOpenClaim] = useState(false);
  const [openInfo, setIsOpenInfo] = useState(false);
  const [openActions, setIsOpenActions] = useState(false);

  const handleStrategyClick = useCallback((strategy: Strategy) => {
    setSelectedStrategy(strategy);
  }, []);

  return (
    <div
      className={classNames('', {
        'xl:flex xl:gap-12 2xl:gap-36': selectedStrategy,
      })}
    >
      <div className="absolute">
        <Button onClick={() => setIsOpenWithdraw(true)}>
          Open Withdraw Modal
        </Button>
        <Button onClick={() => setIsOpenInvest(true)}>Open Invest Modal</Button>
        <Button onClick={() => setIsOpenClaim(true)}>Open Claim Modal</Button>
        <Button onClick={() => setIsOpenInfo(true)}>Open Info Modal</Button>
        <Button onClick={() => setIsOpenActions(true)}>
          Open Actions Modal
        </Button>

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
          position={positions}
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
      <div
        className={classNames(
          'flex flex-col gap-7 pt-[30px] pb-[60px] px-[18px] xl:pr-[0px] xl:max-w-[500px]',
          { 'hidden xl:flex': selectedStrategy },
        )}
      >
        <div className="p-4 flex items-center justify-between gap-4 bg-primary-250 border border-primary-200 rounded-xl">
          <div className="flex flex-col gap-1">
            <h1 className="text-[16px] leading-[17.92px] text-primary-300 font-bold">
              Explore AI powered strategies
            </h1>
            <p className="max-w-[170px] text-[11px] leading-[13.64px] text-primary-300">
              Start earning on Liquid with DeFi Strategies
            </p>
          </div>

          <ChessPiece />
        </div>

        {strategies.map((strategy, index) => (
          <div
            key={index}
            className={classNames({
              'pb-7 border-b border-b-primary-500':
                index !== strategies.length - 1,
            })}
          >
            <StrategyPaper
              strategy={strategy}
              onClick={() => handleStrategyClick(strategy)}
              active={selectedStrategy?.id === strategy.id}
              close={() => setSelectedStrategy(null)}
            />
          </div>
        ))}
      </div>

      {selectedStrategy && (
        <div className="flex flex-col gap-9 xl:hidden px-5">
          <div className="relative flex items-center justify-center">
            <LWClickAnimation
              onClick={() => setSelectedStrategy(null)}
              className="h-fit w-fit absolute left-0 top-0"
            >
              <ArrowLeftIcon />
            </LWClickAnimation>

            <span>Strategy</span>
          </div>

          <StrategyDetail strategy={selectedStrategy} />
        </div>
      )}

      {selectedStrategy && (
        <div className="w-[1px] bg-primary-150 my-[30px] hidden xl:block" />
      )}

      {selectedStrategy && (
        <div className="hidden xl:flex gap-4 pt-[66px]">
          <LWClickAnimation
            onClick={() => setSelectedStrategy(null)}
            className="h-fit w-fit"
          >
            <ArrowRightIcon />
          </LWClickAnimation>

          <div className="max-w-[375px]">
            <StrategyDetail strategy={selectedStrategy} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Strategies;
