// import React, { useState, useEffect } from 'react';
// const PluginDashboard = () => {
//   const [data, setData] = useState([]); // State to hold the data
//   const [loading, setLoading] = useState(true); // State to manage loading status
//   const [error, setError] = useState(null); // State to manage any errors
//   useEffect(() => {
//     // Function to fetch data
//     const fetchData = async () => {
//       try {
//         const response = await fetch('https://canvas.instructure.com/api/v1/courses',
//             { 
//             mode: 'no-cors',
//             method: 'GET',
//             host:'canvas.instructure.com',
//             headers: {
//               'Accept': 'application/json',
//               'Authorization':`Bearer ${process.env.REACT_APP_CANVAS_TOKEN}`,
//             }
//           }
//         ); 

//         if (!response.ok) {
//           throw new Error('Network response was not ok'); // Handle HTTP errors
//         }
//         const result = await response.json(); // Parse JSON response
       
//         setData(result); // Set data in state
//       } catch (error) {
//         setError(error); // Set error in state
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchData(); // Call the fetch function
//   }, []); // Empty dependency array means this runs once when the component mounts

//   // Render loading state
//   if (loading) {
//     return <div>Loading...</div>;
    
//   }

//   // Render error state
//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   // Render the data
//   return (
//     <div>
//       <h2>Data from API:</h2>
//       <ul>
//           {data.data.result.map(item => (
//           <li key={item._id}>
//             <h3>{item.name}</h3>
//             <p>Email: {item.email}</p>
//             <p>Role: {item.role}</p>
//           </li>
//         ))}

//       </ul>
//     </div>
//   );

//   //   return (
// //     <div className="p-4 max-w-6xl mx-auto">
// //       <div className="grid gap-4">
// //         <Card>
// //           <CardHeader>
// //             <h2 className="text-2xl font-bold">Student Engagement Dashboard</h2>
// //           </CardHeader>
// //           <CardContent>
// //             <div className="mb-4">
// //               {loading ? (
// //                 <div className="flex items-center justify-center h-64">
// //                   <span className="text-gray-500">Loading data...</span>
// //                 </div>
// //               ) : (
// //                 <BarChart width={600} height={300} data={engagementData}>
// //                   <CartesianGrid strokeDasharray="3 3" />
// //                   <XAxis dataKey="week" />
// //                   <YAxis />
// //                   <Tooltip />
// //                   <Bar dataKey="engagement" fill="#4f46e5" />
// //                 </BarChart>
// //               )}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <Card>
// //             <CardHeader>
// //               <h3 className="text-xl font-semibold">At-Risk Students</h3>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="flex items-center space-x-2">
// //                 <AlertCircle className="text-red-500" />
// //                 <span>3 students need attention</span>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader>
// //               <h3 className="text-xl font-semibold">Course Progress</h3>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="h-4 bg-gray-200 rounded-full">
// //                 <div 
// //                   className="h-4 bg-green-500 rounded-full" 
// //                   style={{ width: '75%' }}
// //                 ></div>
// //               </div>
// //               <span className="text-sm text-gray-600">75% Complete</span>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );

// };

// export default PluginDashboard;

import React, { useState, useEffect } from 'react';

const PluginDashboard = () => {
  const [courses, setCourses] = useState([]); // State to hold the course data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:7001/api/canvas/courses');

        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  // Render courses data
  return (
    <div>
      <h1>Canvas Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PluginDashboard;
