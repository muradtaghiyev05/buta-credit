"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn, signupFormSchema } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { log } from "console";

const SignupForm = () => {
  const { toast } = useToast();

  const signupForm = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      fatherName: "",
      phone: "",
      birthDate: new Date("1999-01-01"),
      currentAddress: "",
      passportAddress: "",
      finCode: "",
      identityNumber: "",
      password: "",
    },
  });

  async function onSignUp(values: z.infer<typeof signupFormSchema>) {
    try {
      const isExisted = await axios.get(`/api/users/${values.finCode}`);

      if (!isExisted) {
        const user = await axios.post("/api/users", values);
        toast({ description: "Qeydiyyatdan keçdiniz." });
        return user;
      } else {
        toast({
          variant: "destructive",
          description: "Bu FIN kodu ilə artıq qeydiyyatdan keçilib.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        description: "Error baş verdi.",
      });
    }
  }

  return (
    <Form {...signupForm}>
      <form onSubmit={signupForm.handleSubmit(onSignUp)} className="space-y-8">
        <div className="grid gap-3 grid-cols-2">
          <FormField
            control={signupForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad</FormLabel>
                <FormControl>
                  <Input placeholder="Murad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Soyad</FormLabel>
                <FormControl>
                  <Input placeholder="Tağıyev" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="fatherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ata adı</FormLabel>
                <FormControl>
                  <Input placeholder="Elmir" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Əlaqə nömrəsi</FormLabel>
                <FormControl>
                  <Input placeholder="055 360 06 00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Doğum tarixi</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Your birthday</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="passportAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qeydiyyat ünvanı</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="currentAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faktiki ünvan</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="finCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FIN Kodu</FormLabel>
                <FormControl>
                  <Input
                    style={{ textTransform: "uppercase" }}
                    placeholder="1QMSZUD"
                    maxLength={7}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="identityNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vəsiqə nömrəsi</FormLabel>
                <FormControl>
                  <Input
                    maxLength={9}
                    style={{ textTransform: "uppercase" }}
                    placeholder="AA1012321"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
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
        </div>
        <Button type="submit">Qeydiyyatdan keç</Button>
      </form>
    </Form>
  );
};

export default SignupForm;
