import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalWrapperProps } from './types';
import { useIsMobile } from '../hook/useIsMobile';

function ModalWrapper({
  title = '',
  isOpen,
  onClose,
  children,
}: ModalWrapperProps) {
  const isMobile = useIsMobile();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    desktop: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    },
    mobile: {
      hidden: { y: '100%' },
      visible: { y: 0 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="fixed inset-0 bg-black/50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />

          <motion.div
            className={`
              fixed bg-white rounded-3xl overflow-hidden
              ${
                isMobile
                  ? 'bottom-0 left-0 right-0 rounded-b-none'
                  : 'left-0 right-0top-0 w-[400px]'
              }
            `}
            variants={isMobile ? modalVariants.mobile : modalVariants.desktop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col justify-center items-center mt-4 border-[#EAEEF4] border-b-[1px] pb-5">
              {isMobile && (
                <div className="h-[4px] w-[40px] bg-[#E2E8F0] rounded-full" />
              )}
              <h2 className="text-sm font-medium text-center mt-2">{title}</h2>
            </div>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ModalWrapper;
