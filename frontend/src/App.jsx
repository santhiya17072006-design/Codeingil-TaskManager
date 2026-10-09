import { useState } from "react";

const initialCalls = [
  { id: "C101", caller: "Arun Kumar", number: "+91 98765 43210", status: "Answered", duration: "04:32", time: "10:42 AM" },
  { id: "C102", caller: "Priya S", number: "+91 98765 12345", status: "Missed", duration: "00:00", time: "10:35 AM" },
  { id: "C103", caller: "Rahul M", number: "+91 98765 67890", status: "Answered", duration: "02:18", time: "10:21 AM" },
  { id: "C104", caller: "Divya R", number: "+91 98765 09876", status: "In Progress", duration: "01:45", time: "10:15 AM" },
  { id: "C105", caller: "Karthik P", number: "+91 98765 54321", status: "Answered", duration: "05:12", time: "09:58 AM" },
];

const navigation = ["Dashboard", "Live Monitoring", "Reports & Analytics"];

function StatusBadge({ status }) {
  const styles = {
    Answered: "bg-emerald-100 text-emerald-700",
    Missed: "bg-red-100 text-red-700",
    "In Progress": "bg-blue-100 text-blue-700",
  };

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status] || "bg-slate-100 text-slate-700"}`}>
      {status}
    </span>
  );
}

function Sidebar({ page, setPage, mobile = false }) {
  return (
    <div className={mobile ? "flex gap-2 overflow-x-auto" : "space-y-2"}>
      {navigation.map((item, index) => (
        <button
          key={item}
          onClick={() => setPage(item)}
          className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
            page === item
              ? "bg-indigo-600 text-white"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          } ${mobile ? "" : "w-full"}`}
        >
          <span>{["▦", "◉", "▤"][index]}</span>
          {item}
        </button>
      ))}
    </div>
  );
}

function SummaryCard({ title, value, subtitle, symbol, color }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900">{value}</h2>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${color}`}>
          {symbol}
        </div>
      </div>
      <p className="mt-4 text-xs text-slate-500">{subtitle}</p>
    </div>
  );
}

function Dashboard({ calls, setPage }) {
  const answered = calls.filter((call) => call.status === "Answered").length;
  const missed = calls.filter((call) => call.status === "Missed").length;

  const bars = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 68 },
    { day: "Wed", value: 53 },
    { day: "Thu", value: 82 },
    { day: "Fri", value: 62 },
    { day: "Sat", value: 92 },
    { day: "Sun", value: 72 },
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard title="Total Calls" value="1,284" subtitle="+12.5% compared with last week" symbol="☎" color="bg-indigo-100 text-indigo-700" />
        <SummaryCard title="Answered Calls" value="1,092" subtitle="85% answer rate" symbol="✓" color="bg-emerald-100 text-emerald-700" />
        <SummaryCard title="Missed Calls" value="126" subtitle="9.8% of total calls" symbol="↘" color="bg-red-100 text-red-700" />
        <SummaryCard title="Calls Today" value="248" subtitle="Updated throughout the day" symbol="◷" color="bg-amber-100 text-amber-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-slate-900">Call Volume Analytics</h3>
              <p className="mt-1 text-sm text-slate-500">Weekly call activity overview</p>
            </div>
            <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-600">Last 7 days</span>
          </div>

          <div className="mt-8 flex h-56 items-end justify-around gap-3 border-b border-slate-100 pb-2">
            {bars.map((bar) => (
              <div key={bar.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                <div className="flex w-full max-w-10 items-end" style={{ height: "85%" }}>
                  <div
                    className="w-full rounded-t-lg bg-indigo-500 transition hover:bg-indigo-700"
                    style={{ height: `${bar.value}%` }}
                    title={`${bar.value * 10} calls`}
                  />
                </div>
                <span className="text-xs text-slate-500">{bar.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
            <span className="h-2.5 w-2.5 rounded-sm bg-indigo-500" /> Total calls
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="font-bold text-slate-900">Call Distribution</h3>
          <p className="mt-1 text-sm text-slate-500">Current sample overview</p>
          <div className="my-7 flex justify-center">
            <div className="flex h-40 w-40 items-center justify-center rounded-full border-[18px] border-emerald-400">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">85%</p>
                <p className="text-xs text-slate-500">Answered</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full bg-emerald-400" /> Answered</span>
              <strong>{answered || 1092}</strong>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Missed</span>
              <strong>{missed || 126}</strong>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-slate-600"><span className="h-2.5 w-2.5 rounded-full bg-indigo-400" /> Other calls</span>
              <strong>66</strong>
            </div>
          </div>
        </section>
      </div>

      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
          <div>
            <h3 className="font-bold text-slate-900">Recent Activity</h3>
            <p className="mt-1 text-sm text-slate-500">Latest incoming calls</p>
          </div>
          <button onClick={() => setPage("Reports & Analytics")} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">View all →</button>
        </div>
        <CallTable calls={calls.slice(0, 4)} />
      </section>
    </>
  );
}

function CallTable({ calls }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-5 py-4 font-semibold">Caller</th>
            <th className="px-5 py-4 font-semibold">Call ID</th>
            <th className="px-5 py-4 font-semibold">Time</th>
            <th className="px-5 py-4 font-semibold">Duration</th>
            <th className="px-5 py-4 font-semibold">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {calls.map((call) => (
            <tr key={call.id} className="hover:bg-slate-50">
              <td className="px-5 py-4">
                <p className="font-semibold text-slate-800">{call.caller}</p>
                <p className="mt-1 text-xs text-slate-500">{call.number}</p>
              </td>
              <td className="px-5 py-4 text-slate-600">{call.id}</td>
              <td className="px-5 py-4 text-slate-600">{call.time}</td>
              <td className="px-5 py-4 text-slate-600">{call.duration}</td>
              <td className="px-5 py-4"><StatusBadge status={call.status} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {calls.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No calls found.</p>}
    </div>
  );
}

function LiveMonitoring() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { from: "customer", text: "Hi, I need help checking my recent order." },
    { from: "ai", text: "Of course! I can help you with that. Could you share your order number?" },
    { from: "customer", text: "My order number is ORD-2048." },
    { from: "ai", text: "Thank you. I'm checking the order details now." },
  ]);

  function sendMessage(event) {
    event.preventDefault();
    if (!message.trim()) return;
    setMessages((previous) => [...previous, { from: "customer", text: message.trim() }]);
    setMessage("");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Active Conversation</h3>
          <span className="flex items-center gap-2 text-xs font-semibold text-emerald-600"><span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> LIVE</span>
        </div>
        <div className="mt-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-xl font-bold text-indigo-700">AK</div>
          <div>
            <h4 className="font-semibold text-slate-900">Arun Kumar</h4>
            <p className="mt-1 text-sm text-slate-500">+91 98765 43210</p>
          </div>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Call status</p><p className="mt-2 font-semibold text-emerald-700">In Progress</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">Call duration</p><p className="mt-2 text-2xl font-bold text-slate-900">04:32</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-xs text-slate-500">AI sentiment</p><p className="mt-2 font-semibold text-slate-900">Positive</p></div>
        </div>
        <button onClick={() => window.alert("This is a UI demo. No real call is connected.")} className="mt-5 w-full rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-100">End demo call</button>
      </section>

      <section className="flex min-h-[520px] flex-col rounded-2xl border border-slate-200 bg-white shadow-sm xl:col-span-2">
        <div className="border-b border-slate-100 p-5">
          <h3 className="font-bold text-slate-900">Conversation Transcript</h3>
          <p className="mt-1 text-sm text-slate-500">Sample speech-to-text messages and AI responses</p>
        </div>
        <div className="flex-1 space-y-5 p-5">
          {messages.map((item, index) => (
            <div key={`${index}-${item.from}`} className={`flex ${item.from === "ai" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 ${item.from === "ai" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-800"}`}>
                <p className={`mb-2 text-xs font-semibold ${item.from === "ai" ? "text-indigo-100" : "text-slate-500"}`}>{item.from === "ai" ? "AI Assistant" : "Customer · Speech to text"}</p>
                <p className="text-sm leading-6">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={sendMessage} className="flex gap-3 border-t border-slate-100 p-4">
          <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Type a sample transcript message..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500" />
          <button className="rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">Send</button>
        </form>
      </section>
    </div>
  );
}

function Reports({ calls }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredCalls = calls.filter((call) => {
    const matchesQuery = `${call.caller} ${call.number} ${call.id}`.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = filter === "All" || call.status === filter;
    return matchesQuery && matchesStatus;
  });

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <h3 className="font-bold text-slate-900">Call Reports</h3>
          <p className="mt-1 text-sm text-slate-500">Search and filter call records</p>
        </div>
        <span className="rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700">{filteredCalls.length} records</span>
      </div>
      <div className="flex flex-col gap-3 px-5 pb-5 sm:flex-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search caller, number, or ID..." className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500" />
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-500">
          <option>All</option>
          <option>Answered</option>
          <option>Missed</option>
          <option>In Progress</option>
        </select>
      </div>
      <CallTable calls={filteredCalls} />
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("Dashboard");
  const [showNotifications, setShowNotifications] = useState(false);

  const pageDescriptions = {
    Dashboard: "Here's what's happening with your calls today.",
    "Live Monitoring": "Monitor active conversations in real time.",
    "Reports & Analytics": "Review and search your call records.",
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 md:flex">
      <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white p-5 md:block">
        <div className="mb-10 flex items-center gap-3 px-2 pt-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white">☎</div>
          <div><h1 className="text-lg font-bold text-slate-900">CallSphere</h1><p className="text-xs text-slate-500">Call Center Analytics</p></div>
        </div>
        <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Workspace</p>
        <Sidebar page={page} setPage={setPage} />
        <div className="mt-10 rounded-2xl bg-indigo-50 p-4">
          <p className="font-semibold text-indigo-900">Need help?</p>
          <p className="mt-2 text-xs leading-5 text-indigo-700">Your call analytics workspace is ready to explore.</p>
        </div>
        <div className="mt-8 border-t border-slate-100 pt-5 text-xs text-slate-400">CallSphere UI Demo · v1.0</div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-8">
          <div>
            <p className="text-xs font-medium text-slate-500">Workspace / {page}</p>
            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">{page}</h2>
            <p className="mt-1 hidden text-sm text-slate-500 sm:block">{pageDescriptions[page]}</p>
          </div>
          <div className="relative">
            <button onClick={() => setShowNotifications((value) => !value)} aria-label="Notifications" className="relative rounded-xl border border-slate-200 p-3 hover:bg-slate-50">
              ♧<span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            </button>
            {showNotifications && <div className="absolute right-0 top-14 w-64 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-xl"><p className="font-semibold">Notifications</p><p className="mt-2 text-slate-500">You are viewing sample call data.</p></div>}
          </div>
        </header>

        <div className="border-b border-slate-200 bg-white px-4 py-3 md:hidden">
          <Sidebar page={page} setPage={setPage} mobile />
        </div>

        <div className="space-y-6 p-4 sm:p-8">
          {page === "Dashboard" && <Dashboard calls={initialCalls} setPage={setPage} />}
          {page === "Live Monitoring" && <LiveMonitoring />}
          {page === "Reports & Analytics" && <Reports calls={initialCalls} />}
          <footer className="pt-4 text-center text-xs text-slate-400">CallSphere UI Demo · Sample data for demonstration only</footer>
        </div>
      </main>
    </div>
  );
}
