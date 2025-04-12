'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ApplyJobForm } from './ApplyJobForm';

interface ApplyJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
  jobName: string;
  companyName: string;
}

export function ApplyJobDialog({
  isOpen,
  onClose,
  jobId,
  jobName,
  companyName,
}: ApplyJobDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0">
        <ApplyJobForm
          jobId={jobId}
          jobName={jobName}
          companyName={companyName}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
} 