'use client';

import { InfoModalProps } from './types';
import ModalWrapper from './modal-wrapper';

export function InfoModal({
  isOpen,
  onClose,
  title = '',
  description = '',
}: InfoModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} title="Info">
      <div className="p-6">
        <p className="text-[#475569] text-[16px] font-semibold leading-[17.92px] mb-3 font-QuantaGroteskPro">
          {title}
        </p>
        <span className="text-[#475569] text-[15px] leading-[19.80px] font-light">
          {description}
        </span>
      </div>
    </ModalWrapper>
  );
}
