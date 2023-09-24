import SignupForm from "@/components/forms/signup-form";
import LoginForm from "@/components/forms/login-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LoginTabs() {
  return (
    <Tabs
      defaultValue="signup"
      className="px-4 py-8 mt-28 max-w-[600px] lg:w-[600px] border border-gray-200 rounded-md shadow-md"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Yeni müştəri</TabsTrigger>
        <TabsTrigger value="login">Giriş</TabsTrigger>
      </TabsList>
      <TabsContent value="signup" className="mt-8">
        <SignupForm />
      </TabsContent>
      <TabsContent value="login" className="mt-8">
        <LoginForm />
      </TabsContent>
    </Tabs>
  );
}
