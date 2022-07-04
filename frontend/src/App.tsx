import { AppRouter } from "./routes/AppRouter";
import { QueryClientProvider, QueryClient } from "react-query";
import { AuthProvider } from "./context/Auth/AuthProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
