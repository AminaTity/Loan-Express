"use client";

import {Doughnut} from "react-chartjs-2";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PopularStatsEmprunteurProps {
    className?: string
}

export default function PopularStats({className}: PopularStatsEmprunteurProps) {
    const data = {
        labels: ["Completed", "Remaining"],
        datasets: [
            {
                label: "Progression",
                data: [75, 25], // 75% pour 'Completed', 25% pour 'Remaining'
                backgroundColor: ["rgb(109, 40, 217)", "rgb(165 243 252)"], // Couleurs pour chaque segment
                borderWidth: 0,
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        cutout: "75%", // Optionnel : réduit l'épaisseur du donut
        rotation: -90, // Commence à afficher à partir du haut
        circumference: 180, // Affiche uniquement un demi-cercle
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: false,
                position: "bottom", // Place la légende en dessous

                labels: {
                    boxWidth: 12, // Taille du carré de couleur dans la légende
                    padding: 8, // Réduit l'espace autour des légendes
                },
            },
        },
    };

    return (
        <div className="bg-teal-950 rounded-lg w-full h-59 flex flex-col items-center justify-center relative">
            <div className="w-full pl-4">
                <Doughnut data={data} options={options}/>
            </div>

            <div className="bg-green-600 p-1 text-center text-md text-white h-10 rounded-lg w-56 mt-2 mb-2">
                Statistiques LoanExpress
            </div>
        </div>
    );
}
