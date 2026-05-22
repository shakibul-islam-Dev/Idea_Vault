// app/dashboard/page.js এ এটি ব্যবহার করুন (ক্লায়েন্ট সাইড ফেচিং)
"use client";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch("/api/loogs") // আপনার ফোল্ডার অনুযায়ী পাথ
      .then((res) => res.json())
      .then((data) => setLogs(data));
  }, []);

  return (
    <div>
      {logs.map((log) => (
        <div key={log._id}>{log.action}</div>
      ))}
    </div>
  );
}
