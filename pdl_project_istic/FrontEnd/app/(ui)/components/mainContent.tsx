"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../global.css";
import Link from "@/app/(ui)/components/link";
import { GrOptimize } from "react-icons/gr";
import { GiReceiveMoney, GiDuration } from "react-icons/gi";
import { TbReceiptEuro, TbFileInvoice, TbArrowCurveRight } from "react-icons/tb"; // Utilisation de TbFileInvoice à la place de TbContract
import PopularStatsEmprunteur from "./popularStatsEmprunteur";
import { fr } from "date-fns/locale"; // Importez la locale française
import { format } from "date-fns";

export default function MainContent() {
  const [value, setValue] = useState(new Date());
  
  const [isClient, setIsClient] = useState(false);

  const handleDateChange = (date: Date) => {
    setValue(date);
  };


  return (
    <div className="grid grid-cols-12 gap-4 bg-gray-950 text-white w-full p-6">
      {/* Bloc Parent qui contient Montant total emprunté et le bouton Emprunter */}
      <div className="col-span-12 bg-gray-950 rounded-lg shadow-md flex items-center justify-between">
        <div className="bg-teal-950 p-2 rounded-lg shadow-md w-2/3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-light">Montant total de vos Emprunts</h2>
            <p className="text-2xl font-bold mt-1">0 €</p>
          </div>
          <p className="text-green-500 font-medium text-lg">+15%</p>
        </div>
        <div className="inline-flex items-center justify-center bg-[#2d3748] rounded-lg shadow-md">
            <Link title="Emprunter" btnVariant="btn btn-less-border2" href="../../../loan/borrow"/>

        </div>
      </div>

{/* Bloc Parent pour les boutons et le calendrier */}
<div className="col-span-7 bg-gray-950 p-4 rounded-lg shadow-md flex flex-col h-[380px]">
  <div className="flex items-center justify-between mb-4">
    {/* Bouton Rembourser */}
    <button className="bg-teal-950 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2">
      <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-800">
        <TbReceiptEuro className="text-2xl text-white" />
      </div>
      <span>Rembourser</span>
    </button>

    {/* Bouton Contrat de Prêt */}
    <button className="bg-teal-950 text-white font-semibold py-2 px-6 rounded-lg shadow-md flex items-center gap-2">
      <div className="rounded-full h-10 w-10 flex items-center justify-center bg-green-800">
        <TbFileInvoice className="text-2xl text-white" />
      </div>
      <span>Contrat de prêt</span>
    </button>
  </div>

  {/* Calendrier */}
  
    <div className="bg-teal-950 p-0 rounded-lg flex-grow">
      <Calendar
        onChange={handleDateChange}
        value={value}
        locale="fr" // Définit la locale française
        formatMonthYear={(locale, date) => format(date, "MMMM yyyy", { locale: fr })}
        formatShortWeekday={(locale, date) => format(date, "EEEEEE", { locale: fr })}
        className="react-calendar bg-teal-950 border-0 text-white rounded-lg"
      />
      {/* Bloc Montant payé et Montant restant */}
  <div className="pt-4 pr-2 pl-2 bg-teal-950 rounded-xl">
    {/* Montant payé */}
    <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 mb-2 bg-teal-950">
      <div className="flex items-center">
        <div className="h-3 w-4 rounded-full bg-orange-500 mr-3"></div>
        <div>
          <h2 className="text-md font-light">Montant payé</h2>
          <p className="text-sm text-gray-300">Date d'échéance</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold"> 0 €</p>
        <p className="text-sm text-gray-300">Oct 12</p>
      </div>
    </div>

    {/* Montant restant */}
    <div className="flex items-center justify-between border border-gray-300 rounded-lg p-2 mb-2 bg-teal-950">
      <div className="flex items-center">
        <div className="h-3 w-4 rounded-full bg-green-500 mr-3"></div>
        <div>
          <h2 className="text-md font-light">Montant restant</h2>
          <p className="text-sm text-gray-300">Date d'échéance</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold"> 0 €</p>
        <p className="text-sm text-gray-300">Oct 20</p>
      </div>
    </div>

    {/* Montant total */}
    <div className="text-right text-gray-300 text-sm pb-3 pt-3">
      Montant total: <span className="font-bold text-white">0 €</span>
    </div>
  </div>

  </div>
</div>


      {/* Bloc Parent pour Résumé et Courbe de Remboursement */}
      <div className="col-span-5 bg-gray-950 p-2 rounded-lg shadow-md flex flex-col gap-2">
        <div className="bg-teal-950 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Résumé général du prêt en cours :</h2>
                <ul className="mt-4 space-y-2 text-sm">
                    <li className="flex pt-2 items-center gap-4">
                    {/* Icône */}
                    <div className="rounded-md h-7 w-8 flex items-center justify-center bg-green-800">
                        <GrOptimize className="text-lg text-white" />
                    </div>
                    {/* Texte */}
                    <span>Montant Emprunté :  0 €</span>
                    </li>
                    <li className="flex pt-2 items-center gap-4">
                      <div className="rounded-md h-7 w-8 flex items-center justify-center bg-green-800">
                          <GiReceiveMoney className="text-lg text-white" />
                      </div>
                      Montant Restant :  0 €</li>
                    <li className="flex pt-2 items-center gap-4">
                      <div className="rounded-md h-7 w-8 flex items-center justify-center bg-green-800">
                          <GiDuration className="text-lg text-white" />
                      </div>
                      Durée du prêt :  0 Mois</li>
                    <li className="flex pt-2 items-center gap-4">
                      <div className="rounded-md h-7 w-8 flex items-center justify-center bg-green-800">
                          <TbArrowCurveRight className="text-lg text-white" />
                      </div>
                      Taux d'intérêt :  0 € %</li>
                </ul>
            </div>

        <div className="rounded-lg shadow-md">
          <h6 className="text-xl font-semibold pl-4 pt-2">Courbe de Remboursement</h6>
          <div className="flex justify-center h-full items-center rounded-lg">
            <PopularStatsEmprunteur />
          </div>
        </div>
      </div>
    </div>
  );
}
