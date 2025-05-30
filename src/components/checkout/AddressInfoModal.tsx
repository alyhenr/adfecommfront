import { Dialog, DialogPanel } from "@headlessui/react"
import type { Dispatch, SetStateAction } from "react"

const AddressInfoModal = ({ isOpen, setIsOpen, children } : {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
    children: React.ReactNode
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 overflow-y-scroll">
        {/* The actual dialog panel  */}
        {/* <DialogPanel className="flex justify-center mx-auto min-w-[360px] w-[90%] md:w-[800px] rounded bg-white py-1 mt-100 sm:mt-0"> */}
        <DialogPanel className="relative w-full max-w-lg mx-auto transform overflow-hidden bg-white rounded-lg shadow-xl flex items-center justify-center mt-[calc(50vh)] sm:mt-0">
          {/* <DialogTitle>Cadastro de endereço</DialogTitle> */}
            {children}
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default AddressInfoModal