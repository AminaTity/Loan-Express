"use client";

import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PopularStatsProps {
    className?: string
}

export default function PopularStats({className}: PopularStatsProps) {
    const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
            {
                label: 'Progression',
                data: [70, 30], // Exemple: 70% pour 'Completed', 30% pour 'Remaining'
                backgroundColor: ['rgb(8 145 178)', 'rgb(165 243 252)'], // Couleurs pour chaque segment
                borderWidth: 0,
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: '0%',         // Transforme le graphique en donut (optionnel)
        rotation: 0,           // Commence à afficher depuis la position par défaut (à droite)
        circumference: 360,    // Affiche un cercle complet
        plugins: {
            tooltip: {
                enabled: true,
            },
            legend: {
                display: true,
            },
        },
    };

    return (
        <div className="bg-teal-950 p-4 rounded-lg w-64 h-68 flex flex-col items-center justify-center relative">
            <Doughnut data={data} options={options}/>
            <div className="bg-green-600 text-center text-md text-white rounded-lg w-56 mt-4">
                Statistiques LoanExpress
            </div>
        </div>
    );
}
