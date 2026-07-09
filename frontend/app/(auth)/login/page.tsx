import Image from 'next/image';

import AuthForm from '@/features/auth/components/auth-form';
import { loginAction } from '@/features/auth/actions/login-action';

export default function LoginPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-3/4 w-3/5 items-center justify-between bg-[#f0efed]">
        <div className="relative h-full flex-1 overflow-hidden">
          <Image
            alt="Vista previa de TaskMaster"
            src="/mockup/mockupNoHd.webp"
            fill
            className="object-cover"
          />
        </div>
        <AuthForm
          title="Bienvenido de Nuevo "
          variant="login"
          onSubmitForm={loginAction}
        />
      </div>
    </div>
  );
}
