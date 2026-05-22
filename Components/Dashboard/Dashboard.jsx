// // Dashboard.jsx
// "use client";
// import { useState } from "react";
// import CommentUI from "./CommentUI";

// export default function Dashboard() {
//   const [comments, setComments] = useState(initialData);

//   // কমেন্ট রিফ্রেশ করার ফাংশন
//   const refreshComments = async () => {
//     const updatedData = await fetchCommentsFromDB();
//     setComments(updatedData);
//   };

//   return (
//     <div>
//       <CommentUI initialComments={comments} onUpdate={refreshComments} />
//     </div>
//   );
// }
