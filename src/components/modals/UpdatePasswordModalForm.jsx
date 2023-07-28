import React, { Fragment, useState} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { faStar, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { UPDATE_ADMIN_PASS } from "../../constant/constants";
import { useSelector } from "react-redux";
import axios from 'axios'

const ReviewFormModal = ({ isOpen, setIsOpen }) => {
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [updatePasswordReq , setUpdatePasswordReq] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  library.add(faStar, faCheck);
  
  const updatePasswordPass = async (passwordUpdate, accessToken) => {

    await axios.post(UPDATE_ADMIN_PASS, passwordUpdate, {
      headers: {
        Authorization: `Bearer ${accessToken}`,}
      })
    .then(res => {
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setUpdatePasswordReq(!updatePasswordReq)
      setError(res.data.message)
    })
    .catch(err => setError('Wrong Password'))
  }

  const handleUpdatePassword = (e) => {
    e.preventDefault();

    if (currentPassword.length === 0) {
      setError("current password is required!");
      return;
    }
    if (newPassword.length === 0) {
      setError("new password is required!");
      return;
    }
    if (confirmPassword.length === 0) {
      setError("confirm password is required!");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("password does not match!");
      return;
    }
    
    const passwordUpdate = {
      currentPassword,
      newPassword,
      adminId: user.data.admin._id,
    };
    setUpdatePasswordReq(!updatePasswordPass)
    updatePasswordPass(passwordUpdate, user.data.token)
    
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => setIsOpen(false)}
      >
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
                className="max-w-[700px] transform overflow-hidden  
                rounded-2xl bg-white p-8 text-left align-middle shadow-xl shadow-item-shadow transition-all"
              >
                <div
                  onClick={() => setIsOpen(false)}
                  className="absolute right-[-1rem] cursor-pointer top-[.5rem] w-[25px]
                   h-[25px] flex items-center justify-center border p-2 border-gray rounded-full mr-[2rem]"
                >
                  <figure>
                    <img src="../assets/icons/cross.png" alt="cancel" />
                  </figure>
                </div>
                <div className="w-full">
                  {/* ------form container-------- */}
                  <div className="flex justify-between  max-2xl:flex-wrap max-2xl:space-x-0  space-x-[55px] mb-8">
                    {/* basic information settings form */}
                    <div className=" w-[85%] mx-auto mt-[32px] mb-[27px]">
                      <form
                        method="POST"
                        className="w-full"
                        onSubmit={handleUpdatePassword}
                      >
                        <div className="font-inter text-red-light text-center">
                          {error}
                        </div>

                        <div className="w-full mb-4">
                          <label
                            className="text-black-dark font-normal"
                            htmlFor="CurrentPassword"
                          >
                            Current Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              setCurrentPassword(target.value);
                            }}
                            value={currentPassword}
                            className="placeholder:font-normal border border-gray text-gray outline-none 
                            rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                            autoComplete="off"
                            type="password"
                            name="CurrentPassword"
                            id="CurrentPassword"
                            placeholder="password"
                          />
                        </div>
                        <div className="w-full mb-4">
                          <label
                            className="text-black-dark font-normal"
                            htmlFor="newPassword"
                          >
                            New Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              setNewPassword(target.value);
                            }}
                            value={newPassword}
                            className="placeholder:font-normal border border-gray text-gray outline-none 
                            rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                            autoComplete="off"
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="password"
                          />
                        </div>
                        <div className="w-full mb-4">
                          <label
                            className="text-black-dark font-normal"
                            htmlFor="confirmPassword"
                          >
                            Confirm Password
                          </label>
                          <input
                            onChange={({ target }) => {
                              setConfirmPassword(target.value);
                            }}
                            value={confirmPassword}
                            className="placeholder:font-normal border border-gray text-gray outline-none 
                            rounded-3xl h-[3.125rem] pl-[24px] py-[15px] text-[0.875rem] w-full"
                            autoComplete="off"
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="password"
                          />
                        </div>

                        <div className="w-full flex justify-center">
                          <button
                            className="w-[10rem] h-[3.125rem] 
                           rounded-lg bg-blue hover:bg-mid-blue text-center 2xl:mt-16 mt-[33px]  text-white"
                          >Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReviewFormModal;
