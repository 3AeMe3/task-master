import FormAuth from "@/features/register/components/form";
import { registerAction } from "@/features/register/components/register-action";

export default function RegisterPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-[#f0efed] w-3/5 h-3/4 items-center flex justify-between">
        <div className="h-full flex-1">
          <img
            alt="mockup "
            src={"/mockup/mockupNoHd.webp"}
            className="bg-red-300 border-3 h-full object-cover"
          />
        </div>
        <FormAuth title="Register" onSubmitForm={registerAction} />
      </div>
    </div>
  );
}
