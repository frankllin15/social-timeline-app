import * as AlertDialog from "@radix-ui/react-alert-dialog";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  trigger: ReactNode;
  title: string;
  open: boolean;
  setOpen: any;
};

export const Alert = ({ children, trigger, title, open, setOpen }: Props) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-[rgba(0,0,0,.4)]" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 flex flex-col bg-neutral-100 rounded-md -translate-x-1/2 -translate-y-1/2 w-11/12 md:w-8/12 p-4 md:p-8 max-w-full">
          <AlertDialog.Title className="text-black text-2xl font-semibold">
            {title}
          </AlertDialog.Title>
          {children}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};
