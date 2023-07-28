import { AdminNav } from "../../components"
import { useState } from "react";
import { UpdatePasswordModalForm } from "../../components";

export default function Profile() {

    const user = JSON.parse(localStorage.getItem("user"));
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    return (
        <>
            <AdminNav  showDashboard={true}/>
            <div className="w-[80%] max-sm:w-[90%] mt-[8em] mx-auto ">
                <div className="w-full">
                    {/* ------form container-------- */}
                    <div className="flex justify-between  max-2xl:flex-wrap max-2xl:space-x-0  space-x-[55px] mb-8">
                        {/* basic information settings form */}
                        <div className="rounded-3xl shadow-item-shadow mt-4 w-full min-w-[10.375rem] ">

                            <div className=" w-[85%] mx-auto mt-[32px] mb-[27px]">
                                <h2 className="text-[30px] font-semibold font-inter uppercase mb-[33px]">
                                    PROFILE
                                </h2>
                                <div className="text-[15px] mb-2">
                                    <span>Name - </span><span className="mb-[30px]">{user.data.admin.fullName}</span>
                                </div>
                                <div className="mb-10">
                                    <span>Email - </span><span className="mb-[30px]">{user.data.admin.email}</span>
                                </div>
                                <form method="POST" className="w-full">
                                    <div className="w-full mt-4 mb-3">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setIsUpdateModalOpen(true);
                                            }}
                                            className="px-4 py-2 rounded-xl bg-gray-dark hover:bg-gray-mid font-inter"
                                        >
                                            Update password
                                        </button>
                                    </div>

                                    <div className="w-full flex justify-center">

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdatePasswordModalForm
                isOpen={isUpdateModalOpen}
                setIsOpen={setIsUpdateModalOpen}
            />
        </>
    )
}