import { useState } from "react";

const days = [
  "Rose Day", "Propose Day", "Chocolate Day",
  "Teddy Day", "Promise Day", "Hug Day", "Valentine's Day"
];

export default function ConfessionForm({ addConfession }) {
  const [message, setMessage] = useState("");
  const [day, setDay] = useState(days[0]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    addConfession({
      id: Date.now(),
      message,
      day,
      likes: 0,
      createdAt: new Date().toLocaleDateString()
    });

    setMessage("");
  };

  return (
    <form onSubmit={submitHandler} className="form">
      <textarea
        placeholder="Write your anonymous confession 💌"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <select value={day} onChange={(e) => setDay(e.target.value)}>
        {days.map(d => <option key={d}>{d}</option>)}
      </select>
      <button>Post Anonymously</button>
    </form>
  );
}
