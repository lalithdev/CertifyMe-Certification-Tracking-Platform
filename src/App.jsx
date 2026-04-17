import AppRoutes from "./routes/AppRoutes";
import { Toaster } from "sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";


function App() {
  return (
    <>
      <SpeedInsights />
      <Toaster position="top-right" richColors closeButton />
      <AppRoutes />
    </>
  );
}

export default App;