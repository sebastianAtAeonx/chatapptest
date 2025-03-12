import React from "react";
import {
  Header,
  AuthButton,
  LoginForm,
  Footer,
  Divider,
} from "../components/loginComponents";
import {
  GoogleIcon,
  MicrosoftIcon,
  AppleIcon,
  PhoneIcon,
} from "../components/utils";

const Index = () => {
  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
  };

  return (
    <main className="flex flex-col min-h-screen bg-[radial-gradient(137.82%_97.02%_at_12.29%_22.13%,#270D5A_0%,#270C6E_48.36%,#270D5A_100%)]">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow px-5 py-[60px] max-md:py-10 max-sm:py-[30px]">
        <div className="w-full max-w-[498px] flex flex-col items-center gap-[30px]">
          <div className="flex flex-col items-center gap-5 w-full">
            <div className="flex flex-col items-center gap-8 w-full">
              <h1 className="text-[#EFEFF1] text-[32px] font-bold tracking-[0.64px]">
                Log in to aeonxiq
              </h1>
              <div className="flex flex-col gap-4 w-full">
                <AuthButton
                  icon={<GoogleIcon />}
                  provider="Google"
                  onClick={() => handleSocialLogin("Google")}
                />
                <AuthButton
                  icon={<MicrosoftIcon />}
                  provider="Microsoft"
                  onClick={() => handleSocialLogin("Microsoft")}
                />
                <AuthButton
                  icon={<AppleIcon />}
                  provider="Apple"
                  onClick={() => handleSocialLogin("Apple")}
                />
                <AuthButton
                  icon={<PhoneIcon />}
                  provider="Phone"
                  onClick={() => handleSocialLogin("Phone")}
                />
              </div>
            </div>
            <Divider />
            <LoginForm />
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
};

export default Index;
