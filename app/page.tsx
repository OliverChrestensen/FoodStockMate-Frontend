import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row items-center gap-4">
          <Image className="" src="/logo-fsm.png" alt="FoodStockMate" width={180} height={180} />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold  leading-tight">Never forget What's in your <span className="text-[#1DCD9F] block text-primary mt-2 text-center">Fridge again</span></h1>
        <p className="text-xl mt-5 mb-5 text-[#93A2B7] text-muted-foreground max-w-2xl mx-auto">Keep track of all your fridge items, monitor expiry dates, and reduce food waste with FoodStockMate's simple and beautiful inventory manager</p>
       <div className="flex flex-row items-center gap-4">
        <button className="px-10 py-3 rounded-md bg-[#1DCD9F] text-black font-bold hover:bg-[#1DCD9F]/80">
          <Link href="/login">Get Started</Link>
        </button>
       </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mt-16 text-left">
        <div className="p-6 rounded-lg bg-[#192234] border-[#293851] border border-border transition-all">
        <Image className="mb-3" src="/track.svg" alt="track" width={36} height={36} />
          <h2 className="text-xl font-bold">Track Everything</h2>
          <p className="text-lg mt-3 text-[#93A2B7] text-muted-foreground max-w-2xl mx-auto">Add, edit, and manage all your fridge items in one place with detailed information.</p>
        </div>
        <div className="p-6 rounded-lg bg-[#192234] border-[#293851] border border-border transition-all">
        <Image className="mb-3" src="/noti.svg" alt="notification" width={36} height={36} />
          <h2 className="text-xl font-bold">Expiry Alerts</h2>
          <p className="text-lg mt-3 text-[#93A2B7] text-muted-foreground max-w-2xl mx-auto">Set expiry dates for your items and get alerts when they're about to expire.</p>
        </div>
        <div className="p-6 rounded-lg bg-[#192234] border-[#293851] border border-border transition-all">
        <Image className="mb-3" src="/grocery.svg" alt="grocery" width={36} height={36} />
          <h2 className="text-xl font-bold">Reduce Waste</h2>
          <p className="text-lg mt-3 text-[#93A2B7] text-muted-foreground max-w-2xl mx-auto">Reduce food waste by tracking your items and using them before they expire.</p>
        </div>
      </div>
      
    </div>
  );
}
