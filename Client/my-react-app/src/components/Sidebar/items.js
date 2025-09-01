// src/components/Sidebar/items.js
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CompareIcon from "@mui/icons-material/BarChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonIcon from "@mui/icons-material/Person";

export default [
  { title: "Dashboard",   href: "/dashboard", icon: DashboardIcon },
  { title: "Shop & Save", href: "/shop",      icon: ShoppingCartIcon },
  { title: "Compare",     href: "/compare",   icon: CompareIcon },
  { title: "Favorites",   href: "/favorites", icon: FavoriteIcon },
  { title: "My Orders",   href: "/orders",    icon: ReceiptLongIcon },
  { title: "Products",    href: "/products",  icon: StorefrontIcon },
  { title: "My Account",  href: "/account",   icon: PersonIcon },
];
