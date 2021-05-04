import { Navbar } from "./components";
import Routes from "./routes";

function App() {
  return (
    <div className="container-fluid p-0 m-0">
      <Navbar />

      <div className="container-fluid m-0 p-1">
        <div className="container-md mt-3 rounded shadow-sm border p-3">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default App;
