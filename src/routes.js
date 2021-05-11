import DashboardIcon from "./assets/DashboardIcon.svg";
import DashboardIconActive from "./assets/DashboardIconActive.svg";
import TransactionsIcon from "./assets/TransactionsIcon.svg";
import TransactionsIconActive from "./assets/TransactionsIconActive.svg";
import SecureIcon from "./assets/SecureIcon.svg";
import SecureIconActive from "./assets/SecureIconActive.svg";
import SettingsIcon from "./assets/SettingsIcon.svg";
import SettingsIconActive from "./assets/SettingsIconActive.svg";
import SignOutIcon from "./assets/SignOutIcon.svg";
import AccountsIcon from "./assets/AccountsIcon.svg";
import AccountsIconActive from "./assets/AccountsIconActive.svg";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transactions from "./pages/Transactions";
import Secure from "./pages/Secure";
import Settings from "./pages/Settings";
import GamesIcon from "./assets/GamesIcon.svg";
import GamesIconActive from "./assets/GamesIconActive.svg";
import Games from "./pages/Games";
import TodoIcon from "./assets/TodoIcon.svg";
import TodoIconActive from "./assets/TodoIconActive.svg";
import Todos from "./pages/Todos";

const routes = [
  {
    label: "Dashboard",
    path: "/",
    icon: DashboardIcon,
    activeIcon: DashboardIconActive,
    component: Dashboard,
  },
  {
    label: "Todos",
    path: "/todos",
    icon: TodoIcon,
    activeIcon: TodoIconActive,
    component: Todos,
  },
  {
    label: "Accounts",
    path: "/accounts",
    icon: AccountsIcon,
    activeIcon: AccountsIconActive,
    component: Accounts,
  },
  {
    label: "Transactions",
    path: "/transactions",
    icon: TransactionsIcon,
    activeIcon: TransactionsIconActive,
    component: Transactions,
  },
  {
    label: "Secure",
    path: "/secure",
    icon: SecureIcon,
    activeIcon: SecureIconActive,
    component: Secure,
  },
  {
    label: "Games",
    path: "/games",
    icon: GamesIcon,
    activeIcon: GamesIconActive,
    component: Games,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: SettingsIcon,
    activeIcon: SettingsIconActive,
    component: Settings,
  },
  {
    label: "Sign Out",
    path: "/sign-out",
    icon: SignOutIcon,
    activeIcon: SignOutIcon,
  },
];

export default routes;
