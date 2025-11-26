// 'use client';

// import { useUser } from '@clerk/nextjs';
// import { redirect } from 'next/navigation';
// import React from 'react';
// import Header from '@/_components/Header';

// export default function DashboardPage() {
//   const { user, isLoaded } = useUser();

//   if (!isLoaded) {
//     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
//   }

//   if (!user) {
//     redirect('/sign-in');
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <div className="flex-1 max-w-7xl mx-auto w-full p-8">
//         <h1 className="text-4xl font-bold mb-6">Welcome to your Dashboard, {user.firstName}!</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <div className="p-6 bg-accent rounded-lg border border-border">
//             <h2 className="text-xl font-semibold mb-2">My Courses</h2>
//             <p className="text-muted-foreground">View all your enrolled courses</p>
//           </div>
//           <div className="p-6 bg-accent rounded-lg border border-border">
//             <h2 className="text-xl font-semibold mb-2">Progress</h2>
//             <p className="text-muted-foreground">Track your learning progress</p>
//           </div>
//           <div className="p-6 bg-accent rounded-lg border border-border">
//             <h2 className="text-xl font-semibold mb-2">Certificates</h2>
//             <p className="text-muted-foreground">View your earned certificates</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
