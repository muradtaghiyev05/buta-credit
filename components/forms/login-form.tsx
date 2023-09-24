"use client";

import * as z from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { loginFormSchema } from "@/lib/utils";

const LoginForm = () => {
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      finCode: "",
      password: "",
    },
  });

  async function onLogin(values: z.infer<typeof loginFormSchema>) {
    try {
      const user = await axios.get(`/api/users/${values.finCode}`);

      if (user?.data?.password === values.password) {
        toast({ description: "Uğurla giriş etdiniz." });
        router.push(`/users/${values.finCode}`);
      } else {
        toast({
          variant: "destructive",
          description: "FIN kodu və ya şifrə yanlışdır.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...loginForm}>
      <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4">
        <FormField
          control={loginForm.control}
          name="finCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FIN Kodu</FormLabel>
              <FormControl>
                <Input
                  style={{ textTransform: "uppercase" }}
                  maxLength={7}
                  placeholder="1QMSZUD"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={loginForm.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Şifrə</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
