"use client";

import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreditModal from "@/components/credit-modal";
import { Button } from "@/components/ui/button";

const UserPage = () => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    fatherName: "",
    phone: "",
    birthDate: "",
    currentAddress: "",
    passportAddress: "",
    finCode: "",
    identityNumber: "",
  });
  const params = useParams();

  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${params.finCode}`);

        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen p-8">
      <Link className="block my-4" href="/">
        <Button>Yeni müştəri qeydiyyatı</Button>
      </Link>
      <Card>
        <CardHeader>
          <CardTitle>Müştəri məlumatları</CardTitle>
          <CardDescription>
            Burada şəxsi məlumatlarınızı görə bilərsiniz
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Ad:</span> {user.name}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Soyad:</span> {user.surname}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Ata adı:</span> {user.fatherName}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Telefon:</span> {user.phone}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Doğum tarixi:</span> {user.phone}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">FİN Kodu:</span> {user.finCode}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Vəsiqə nömrəsi:</span>{" "}
            {user.identityNumber}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Faktiki ünvan:</span>{" "}
            {user.currentAddress}
          </div>
          <div className="shadow-sm py-2 px-4">
            <span className="font-semibold">Qeydiyyat ünvanı:</span>{" "}
            {user.passportAddress}
          </div>
        </CardContent>
      </Card>

      <CreditModal user={user} />
    </div>
  );
};

export default UserPage;
