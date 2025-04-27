import { useState } from 'react';
import { User, Mail, FileText, MessageSquare } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

const FeedbackForm = () => {
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [formType, setFormType] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId || !email || !formType || !message) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, email, formType, message }),
      });

      if (!response.ok) {
        throw new Error('Feedback submission failed');
      }

      setUserId('');
      setEmail('');
      setFormType('');
      setMessage('');
      toast.success('Feedback submitted successfully 🚀');
    } catch (error: any) {
      toast.error('Error submitting feedback: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#333',
            color: '#FFD700',
            fontWeight: 'bold',
          },
        }}
      />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-[#0d0d0d] p-8 rounded-2xl shadow-2xl space-y-5"
      >
        <h2 className="text-3xl font-extrabold text-center mb-4 text-[#FFD700]">
          📋 Submit Feedback
        </h2>

        {/* Name Field */}
        <div className="relative">
          <User className="absolute left-3 top-3 text-[#FFD700]" size={20} />
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Your Name"
            className="w-full pl-10 p-3 rounded bg-black border border-[#FFD700] text-[#FFD700] placeholder-[#FFD700]/70 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            required
          />
        </div>

        {/* Email Field */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-[#FFD700]" size={20} />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            className="w-full pl-10 p-3 rounded bg-black border border-[#FFD700] text-[#FFD700] placeholder-[#FFD700]/70 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            required
          />
        </div>

        {/* Form Type Select */}
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-[#FFD700]" size={20} />
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className="w-full pl-10 p-3 rounded bg-black border border-[#FFD700] text-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            required
          >
            <option value="" disabled>Select Feedback Type</option>
            <option>Order Issue</option>
            <option>Suggestion Box</option>
            <option>Delivery Feedback</option>
            <option>Cancellation Reason</option>
            <option>Meal Customization Request</option>
            <option>Allergy Notification</option>
            <option>Loyalty/Rewards Feedback</option>
            <option>Feature Request</option>
          </select>
        </div>

        {/* Message Textarea */}
        <div className="relative">
          <MessageSquare className="absolute left-3 top-3 text-[#FFD700]" size={20} />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            rows={4}
            className="w-full pl-10 p-3 rounded bg-black border border-[#FFD700] text-[#FFD700] placeholder-[#FFD700]/70 focus:outline-none focus:ring-2 focus:ring-[#FFD700]"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#FFD700] text-black font-bold py-3 rounded-xl hover:bg-[#e6c200] transition-all duration-300"
        >
          🚀 Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
