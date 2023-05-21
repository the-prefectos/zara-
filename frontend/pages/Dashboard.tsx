import Link from "next/link";
import Navbar from "./Navbar";
import './css/Home.css'
import './css/dashboard.css'

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <div>

        <h1>Category</h1>
        <Link legacyBehavior  href="/men">
          <a>
            <button type="submit"  id="m">MEN</button>
          </a>
        </Link>
        <Link legacyBehavior href="/women">
          <a>
            <button id="w">WOMEN</button>
          </a>
        </Link>
        <Link  legacyBehavior href="/kids">
          <a>
            <button id="k">KIDS</button>
          </a>
        </Link>
        <Link legacyBehavior href="/clothes">
          <a>
            <button id="o">OTHER</button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
