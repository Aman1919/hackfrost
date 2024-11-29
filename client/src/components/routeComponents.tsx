// import { Navigate } from "react-router-dom";

// export const PrivateRoute = ({ children }: RouteProps) => {
//     const { isLoading } = useGetUser(); // Fetch and set the user on component mount
//     const user = usePersonStore((state) => state.user);
  
//     if (isLoading) return <Spinner />;
  
//     if (!user) return <Navigate to="/login" />;
  
//     switch (user.role) {
//       // case "ADMIN":
//       //   return <Navigate to="/dashboard" />;
//       // case "MODRATOR":
//       //   return <ModratorDashboard />;
//       default:
//         return <>{children}</>;
//     }
//   };
  
//   export const PublicRoute = ({ children }: RouteProps) => {
//     const { isLoading } = useGetUser(); // Fetch and set the user on component mount
//     const user = usePersonStore((state) => state.user);
  
//     if (isLoading) return <Spinner />;
  
//     return user ? (
//       <Navigate to="/game" />
//     ) : (
//       <>
//         {children}
//       </>
//     );
//   };