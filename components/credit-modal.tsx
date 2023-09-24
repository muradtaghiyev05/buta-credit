import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { creditFormSchema, rnd } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface TableData {
  month: number;
  principal: number;
  interest: number;
  balance: number;
}

export default function CreditModal({ user }: { user: any }) {
  const [tableData, setTableData] = useState<TableData[]>([]);

  const creditForm = useForm<z.infer<typeof creditFormSchema>>({
    resolver: zodResolver(creditFormSchema),
    defaultValues: {
      professionField: "",
      monthlyIncome: 0,
      yearsOfExperience: 0,
      monthsOfExperience: 0,
      region: "",
      businessAddress: "",
      currency: undefined,
      purpose: "",
      amount: 0,
      duration: 0,
      percentage: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof creditFormSchema>) {
    try {
      await axios.post(`/api/users/${user.finCode}/credits`, {
        ...values,
        userId: user.id,
        tableData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function onTableSubmit(values: z.infer<typeof creditFormSchema>) {
    const principal = values.amount;
    const interest = values.percentage;
    const months = values.duration;

    let i = interest / 100.0 / 12;
    let payment = rnd(principal * (i + i / (Math.pow(1 + i, months) - 1)));

    let balance = principal;
    let tableArr = [];
    for (let m = 1; m < months; m++) {
      const tointerest = rnd(balance * i);
      const toprincipal = rnd(payment - tointerest);
      balance = rnd(balance - toprincipal);

      tableArr.push({
        month: m,
        principal: toprincipal,
        interest: tointerest,
        balance: balance,
      });
    }
    setTableData(tableArr);
  }

  return (
    <Dialog>
      <DialogTrigger className="my-4" asChild>
        <Button variant="default">Yeni kredit sifarişi</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[750px] overflow-y-scroll max-h-[95vh]">
        <DialogHeader>
          <DialogTitle>Yeni kredit sifarişi yarat</DialogTitle>
          <DialogDescription>
            Aşağıda qeyd olunan hər bir məlumatı dolduraraq yeni kredit sifariş
            edə bilərsiniz.
          </DialogDescription>
        </DialogHeader>
        <Form {...creditForm}>
          <form>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <FormField
                control={creditForm.control}
                name="professionField"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fəaliyyət sektoru</FormLabel>
                    <FormControl>
                      <Input placeholder="Maliyyə" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="monthlyIncome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Aylıq gəlir (AZN)</FormLabel>
                    <FormControl>
                      <Input placeholder="1200" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="yearsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İş təcrübəsi (il)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="monthsOfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>İş təcrübəsi (ay)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Input placeholder="Bakı" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="businessAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biznes ünvanı</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="currency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valyuta</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Valyuta seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AZN">Az. Manatı (AZN)</SelectItem>
                        <SelectItem value="TL">Türk Lirəsi (TL)</SelectItem>
                        <SelectItem value="USD">ABŞ Dolları (USD)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biznes kreditin məqsədi</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Məbləğ</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Müddət (ay)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={creditForm.control}
                name="percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faiz</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                onClick={creditForm.handleSubmit(onTableSubmit)}
                className="mt-auto"
                type="submit"
              >
                Hesabla
              </Button>
            </div>
            <Table className="my-6">
              <TableCaption>
                Bu cədvəldə hər ayın məbləğini görə bilərsiniz.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ay</TableHead>
                  <TableHead>Aylıq Ödəniş</TableHead>
                  <TableHead>Faiz</TableHead>
                  <TableHead className="text-right">Borcun qalığı</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((data) => (
                  <TableRow key={data.month}>
                    <TableCell className="font-medium">{data.month}</TableCell>
                    <TableCell>
                      {data.principal
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+\.\d\d$)/g, "$1,")}
                    </TableCell>
                    <TableCell>{data.interest.toFixed(2)} %</TableCell>
                    <TableCell className="text-right">
                      {data.balance
                        .toFixed(2)
                        .replace(/(\d)(?=(\d{3})+\.\d\d$)/g, "$1,")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <DialogFooter>
              <Button
                onClick={creditForm.handleSubmit(onSubmit)}
                className="mt-auto"
                type="submit"
              >
                Yeni kredit sifarişi
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
