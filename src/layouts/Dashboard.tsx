import "./dashboard.css";

import { Outlet } from "@tanstack/react-router";

import SideBar from "./components/sidebar";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;