import HeaderDashboard from "./(ui)/components/headerDashboard";
import RecentOrders from "./(ui)/components/recentOrders";

export default function Investissements() {
    return (
        <div>
            <HeaderDashboard
                userName="Alexandre Tahi"
                welcomeMessage="Bonjour"
                description="Voici les informations clés de vos emprunts ."
            />
            <RecentOrders  showSearch={false}/>  {/* Exemple avec limit */}
        </div>
    );
}
