export interface ActivityNotification {
  id: number;
  name: string;
  city: string;
  state: string;
  action: string;
}

export const activityNotifications: ActivityNotification[] = [
  { id: 1, name: "Sarah L.", city: "Austin", state: "TX", action: "withdrew $2500 welcome bonus" },
  { id: 2, name: "Michael R.", city: "Miami", state: "FL", action: "unlocked a $1800 reward payout" },
  { id: 3, name: "Jessica T.", city: "Denver", state: "CO", action: "received a $3200 challenge bonus" },
  { id: 4, name: "David K.", city: "Seattle", state: "WA", action: "withdrew $2750 in winnings" },
  { id: 5, name: "Amanda P.", city: "Phoenix", state: "AZ", action: "activated her exclusive $1500 bonus" },
  { id: 6, name: "Chris M.", city: "Chicago", state: "IL", action: "cashed out a $4100 reward" },
  { id: 7, name: "Emily J.", city: "Nashville", state: "TN", action: "secured a $2250 member bonus" },
  { id: 8, name: "Brandon S.", city: "Orlando", state: "FL", action: "redeemed a $3600 cash reward" },
  { id: 9, name: "Nicole W.", city: "Dallas", state: "TX", action: "received a $2900 instant payout" },
  { id: 10, name: "Tyler B.", city: "San Diego", state: "CA", action: "withdrew $2500 welcome bonus" },
  { id: 11, name: "Rachel C.", city: "Charlotte", state: "NC", action: "withdrew $1950 in rewards" },
  { id: 12, name: "Kevin H.", city: "Boston", state: "MA", action: "claimed a limited-time $2700 bonus" },
  { id: 13, name: "Lauren D.", city: "Las Vegas", state: "NV", action: "cashed out $3450 successfully" },
  { id: 14, name: "Ethan G.", city: "Atlanta", state: "GA", action: "received a $2100 welcome reward" },
  { id: 15, name: "Megan F.", city: "Portland", state: "OR", action: "unlocked a $4250 bonus payout" },
  { id: 16, name: "Jason T.", city: "Tampa", state: "FL", action: "redeemed a $1750 member reward" },
  { id: 17, name: "Olivia N.", city: "Houston", state: "TX", action: "secured a $3900 bonus withdrawal" },
  { id: 18, name: "Daniel P.", city: "Columbus", state: "OH", action: "activated a $200 instant bonus" },
  { id: 19, name: "Sophia R.", city: "Sacramento", state: "CA", action: "claimed a $4800 cash reward" },
  { id: 20, name: "Matthew C.", city: "New York", state: "NY", action: "withdrew a $2500 welcome payout" }
];