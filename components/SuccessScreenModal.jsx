import { Fragment } from "react";
import { useRecoilState } from "recoil";
import { successScreenState } from "../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";

function SuccessScreenModal() {
  const [successScreenOpen, setSuccessScreenOpen] =
    useRecoilState(successScreenState);
  return (
    //-----Transition root and Dialog allow for a smooth transition to the modal state.
    <Transition.Root show={successScreenOpen} as={Fragment} >
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => setSuccessScreenOpen(false)}
      >
        <Dialog.Panel>
          <Dialog.Title>Playlist Successfully Created</Dialog.Title>
        </Dialog.Panel>
        <div className="flex items-end justify-center min-h-[400px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/*-----This code tricks the browser into rendering the modal in the middle of the screen.*/}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-black text-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle align-top sm:max-w-sm sm:w-full sm:p-6">
              <div className="flex">
                <div className="flex flex-col">
                  <h6>Creation Successful!</h6>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default SuccessScreenModal;
