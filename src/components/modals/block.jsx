import React, { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";


const Block = ({ blockOpen, setBlockOpen, blockUser, id , blockStatus, user}) => {
    const formClose = () => { setBlockOpen(false) };
    

    return (
        <Transition appear show={blockOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => formClose()}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-trans-card bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel
                                className="w-full max-w-[700px] transform overflow-hidden 
                rounded-2xl bg-white p-6 text-left align-middle shadow-xl shadow-item-shadow transition-all"
                            >
                                <div
                                    onClick={() => formClose()}
                                    className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                   h-[25px] flex items-center justify-center border-2 p-2 border-gray rounded-full mr-[2rem]"
                                >
                                    <figure>
                                        <img src="../assets/icons/cross.png" alt="cancel form" />
                                    </figure>
                                </div>
                                <div>
                                        <div className="relative">
                                            <h1 className="text-[1.4em] m-[2em] text-center font-semibold text-xl font-roboto">Do you want to {blockStatus==='false' ? <>Block</> : <>Unblock</>} this {user==='user' ? <>User</> : <>Dj</>}?</h1>
                                        </div>
                                        <div className="flex justify-center mt-[1rem] mb-[1em]">
                                            <button onClick={()=> blockUser({id, blockStatus})}
                                                className="bg-blue hover:bg-mid-blue rounded-lg py-2 px-16 text-white font-roboto "
                                            >
                                                { blockStatus==='false' ? (<>Block</>) : (<>Unblock</>) }
                                            </button>
                                        </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

export default Block;