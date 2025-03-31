import { apiCheckPassword, apiResetPassword } from '@/apis/user'
import { Button, InputForm, OtpVerify, Title } from '@/components'
import withBaseTopping from '@/hocs/withBaseTopping'
import { modal } from '@/redux/appSlice'
import { logout } from '@/redux/userSlice'
import { auth } from '@/ultils/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const ChangePassword = ({ phone, dispatch }) => {
    const { formState: { errors, isDirty }, handleSubmit, register, reset, getValues } = useForm()
    const [showOpt, setShowOpt] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isPermit, setIsPermit] = useState(false)
    useEffect(() => {
        reset({ phone })
    }, [phone])
    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                auth,
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSendOTP();
                    },
                    "expired-callback": () => { },
                }
            );
        }
    }

    const onSendOTP = () => {
        setIsLoading(true)
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = "+84" + phone;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                setIsLoading(false)
                window.confirmationResult = confirmationResult;
                setShowOpt(true);
                toast.success("OTP sended successfully!");
            })
            .catch((error) => {
                setIsLoading(false)
                console.log(error);
            });
    }
    const onSubmit = async (data) => {
        if (data.newPassword !== data.newPassword2) return alert('Mật khẩu không trùng khớp')
        if (!isPermit) return
        const response = await apiResetPassword(data)
        if (response.success) {
            Swal.fire('Done!', response.mes, 'success').then(() => dispatch(logout()))
        } else toast.error(response.mes)
    }
    return (
        <div onClick={e => e.stopPropagation()} className='w-4/5 max-w-[450px] bg-white max-h-screen overflow-y-auto rounded-md'>
            {showOpt && <div onClick={() => setShowOpt(false)} className='absolute z-[1000] inset-0 bg-overlay-70 h-screen flex items-center justify-center'>
                <OtpVerify
                    setShowOtp={setShowOpt}
                    loading={isLoading}
                    setLoading={setIsLoading}
                    setIsPermit={setIsPermit}
                />
            </div>}
            <div id='recaptcha-container'></div>
            <div className='p-4 flex items-center justify-between border-b'>
                <h1 className='text-2xl font-bold tracking-tight'>{`Thay đổi mật khẩu`}</h1>

            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='p-4 flex flex-col gap-2'>
                {!isPermit && <InputForm
                    label='Hệ thống sẽ gửi OTP về SĐT này:'
                    register={register}
                    errors={errors}
                    id='phone'
                    validate={{ required: 'Trường này không được bỏ trống.' }}
                    fullWidth
                    readOnly
                    inputClassName='border-gray-300 bg-gray-200 focus:outline-none focus:ring-transparent focus:ring-offset-0 focus:border-transparent focus: ring-0 cursor-default'
                />}
                {isPermit && <>
                    <InputForm
                        label='Mật khẩu mới'
                        register={register}
                        errors={errors}
                        id='newPassword'
                        validate={{ required: 'Trường này không được bỏ trống.' }}
                        placeholder='Hãy nhập mật khẩu mới'
                        fullWidth
                        type='password'
                    />
                    <InputForm
                        label='Nhập lại mật khẩu'
                        register={register}
                        errors={errors}
                        id='newPassword2'
                        validate={{ required: 'Trường này không được bỏ trống.' }}
                        fullWidth
                        type='password'
                        placeholder='Hãy nhập lại mật khẩu mới'
                    />
                </>}
                <div className='w-full flex items-center justify-end gap-4 mt-6'>
                    {isPermit
                        ? <Button disabled={isLoading} type='submit'>Update Password</Button>
                        : <>
                            <Button disabled={isLoading} onClick={onSendOTP}>Submit</Button>
                            <Button onClick={() => dispatch(modal({ isShowModal: false, modalContent: null }))} className='bg-main-yellow'>Đổi SĐT</Button>
                        </>}
                </div>
            </form>
        </div>
    )
}

export default withBaseTopping(ChangePassword)