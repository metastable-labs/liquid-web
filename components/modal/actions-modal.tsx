'use client';

import React from 'react';
import { Dot, Info } from 'lucide-react';
import { ActionModalProps } from './types';
import Image from 'next/image';
import { Button } from '../ui/button';
import ModalWrapper from './modal-wrapper';

function ActionsModal({
  isOpen,
  onClose,
  onWithdraw,
  onClaimYield,
  onClaimRewards,
  position,
}: ActionModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Action">
      <div className="p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl">
            <div className="flex items-center gap-4">
              <div className="space-y-2">
                <span className="text-[15px] text-[#1E293B] font-medium">
                  {position.name}
                </span>
                <div className="flex -space-x-2">
                  {position.icons.map((icon, i) => (
                    <div key={i}>
                      <Image
                        src={icon}
                        alt="Token icon"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    </div>
                  ))}

                  <div className="w-10 flex justify-center items-center self-center">
                    <Dot size={20} strokeWidth={1} />
                  </div>

                  {position.icons.map((icon, i) => (
                    <div key={i}>
                      <Image
                        src={icon}
                        alt="Token icon"
                        width={16}
                        height={16}
                        className="rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-[12px] text-[#64748B] font-light">
              Est. APY{' '}
              <span className="text-[#4691FE] text-[13px] font-medium">
                {position.apy}%
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl">
              <div>
                <div className="flex items-center gap-1 text-sm text-[#64748B] text-[12px] font-light">
                  Total Balance <Info className="h-3 w-3" />
                </div>
                <div className="text-lg font-medium text-[13px] font-ClashDisplay">
                  ${position.totalBalance.toLocaleString()}
                </div>
              </div>
              <Button
                onClick={onWithdraw}
                variant="secondary"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-[28px] text-[11px] w-[73px]"
              >
                Withdraw
              </Button>
            </div>

            <div className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl">
              <div>
                <div className="flex items-center gap-1 text-sm text-[#64748B] text-[12px] font-light">
                  Yield Earned <Info className="h-3 w-3" />
                </div>
                <div className="text-lg font-medium text-[13px] font-ClashDisplay">
                  ${position.yieldEarned.toLocaleString()}
                </div>
              </div>
              <Button
                onClick={onClaimYield}
                variant="secondary"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-[28px] text-[11px] w-[73px]"
              >
                Claim
              </Button>
            </div>

            <div className="flex items-center justify-between border-[#EAEEF4] border-[1px] px-4 py-3 rounded-xl">
              <div>
                <div className="flex items-center gap-1 text-sm text-[#64748B] text-[12px] font-light">
                  Rewards <Info className="h-3 w-3" />
                </div>
                <div className="text-lg font-medium text-[13px] font-ClashDisplay">
                  ${position.rewards.toLocaleString()}
                </div>
              </div>
              <Button
                onClick={onClaimRewards}
                variant="secondary"
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl h-[28px] text-[11px] w-[73px]"
              >
                Claim
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
}

export default ActionsModal;
