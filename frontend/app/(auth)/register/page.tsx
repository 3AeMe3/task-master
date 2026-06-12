import Image from "next/image";

import AuthForm from "@/features/auth/components/auth-form";
import { registerAction } from "@/features/auth/actions/register-action";

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-[#f0efed] w-3/5 h-3/4 items-center flex justify-between">
        <div className="relative h-full flex-1 overflow-hidden">
          <Image
            alt="Vista previa de TaskMaster"
            src="/mockup/mockupNoHd.webp"
            fill
            className="object-cover"
          />
        </div>
        <AuthForm title="Register" onSubmitForm={registerAction} />
      </div>
    </div>
  );
}
