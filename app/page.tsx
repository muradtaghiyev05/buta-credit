import LoginTabs from "@/components/form-tabs";
import prismadb from "@/lib/prismadb";

export default async function Home() {
  return (
    <div className="h-screen flex justify-center">
      <div>
        <LoginTabs />
      </div>
    </div>
  );
}
