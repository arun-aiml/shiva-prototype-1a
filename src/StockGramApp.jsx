import React, { useState } from "react";
import { Search, Heart, MessageSquare, Share2, Grid, Compass, Bell, Bookmark, Globe2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area } from "recharts";

// Mock data for markets
const niftyData = [
  { d: '09:15', v: 19800 },
  { d: '10:00', v: 19850 },
  { d: '11:00', v: 19780 },
  { d: '12:00', v: 19860 },
  { d: '13:00', v: 19910 },
  { d: '14:00', v: 19870 },
  { d: '15:30', v: 19927 },
];
const bseData = niftyData.map(p => ({ ...p, v: Math.round(p.v * 1.02) }));

const instaPosts = [
  { id: 1, user: { name: 'Ravi Sharma', handle: '@quant_ravi' }, image: 'https://source.unsplash.com/900x700/?stocks,chart', caption: 'ACME momentum looks strong after earnings roundup.', likes: 420, comments: 34, national: true },
  { id: 2, user: { name: 'Meera Iyer', handle: '@fin_notes' }, image: 'https://source.unsplash.com/900x700/?renewable,energy', caption: 'GVLT storage commissioning could shift regional supply.', likes: 210, comments: 18, national: false },
  { id: 3, user: { name: 'MarketPulse', handle: '@mktpulse' }, image: 'https://source.unsplash.com/900x700/?technology,stocks', caption: 'Tech sector showing divergence — watch semiconductors.', likes: 612, comments: 78, national: true },
];

const trendingTopics = ['#ACME', '#GVLT', '#NIFTY', '#ESG', '#TechRun'];
const notifications = [
  { id: 1, text: 'ACME published Q2 results', time: '2h' },
  { id: 2, text: 'You were mentioned in a comment by @finedge', time: '4h' },
  { id: 3, text: 'New follower: @invest_sara', time: '1d' },
];
const messages = [
  { id: 1, from: 'Anand', handle: '@anand_trades', text: 'Saw your post on ACME — thoughts on guidance?', unread: true },
  { id: 2, from: 'Priya', handle: '@priya_fin', text: 'Can you share the GVLT notes?', unread: true },
  { id: 3, from: 'Dev', handle: '@dev_algo', text: 'Collab on a trading model?', unread: false },
];
const bookmarks = [
  { id: 1, title: 'ACME Q2 deck', meta: 'Company page' },
  { id: 2, title: 'GVLT storage brief', meta: 'Research' },
  { id: 3, title: 'NIFTY sectoral rotation', meta: 'Article' },
];

const nifty50 = [
  { symbol: 'TCS', name: 'Tata Consultancy Services' },
  { symbol: 'RELIANCE', name: 'Reliance Industries' },
  { symbol: 'HDFCBANK', name: 'HDFC Bank' },
  { symbol: 'INFY', name: 'Infosys' },
  { symbol: 'ITC', name: 'ITC' },
  { symbol: 'ICICIBANK', name: 'ICICI Bank' },
  { symbol: 'LT', name: 'Larsen & Toubro' },
  { symbol: 'HINDUNILVR', name: 'Hindustan Unilever' },
  { symbol: 'SBIN', name: 'State Bank of India' },
  { symbol: 'AXISBANK', name: 'Axis Bank' },
];

const communities = [
  { id: 1, name: 'Day Traders Club', desc: 'Short-term setups and intraday ideas.' },
  { id: 2, name: 'ESG Investors', desc: 'Sustainable investing discussions.' },
  { id: 3, name: 'Startup Founders', desc: 'Connect with founders and VCs.' },
];

function TopBar({ nationalOnly, setNationalOnly, setPage }) {
  return (
    <div className="w-full border-b p-3 flex items-center justify-between bg-white sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <div className="font-bold text-xl">StockGram</div>
        <div className="flex items-center gap-2 border rounded-full px-2 py-1">
          <MapPin className="h-4 w-4" />
          <button className={`px-2 py-1 rounded ${nationalOnly ? 'bg-neutral-900 text-white' : ''}`} onClick={() => setNationalOnly(true)}>National</button>
          <button className={`px-2 py-1 rounded ${!nationalOnly ? 'bg-neutral-900 text-white' : ''}`} onClick={() => setNationalOnly(false)}>Global</button>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:block"><Input placeholder="Search posts, tickers, companies" /></div>
        <div className="flex gap-2">
          <Button variant="ghost" onClick={() => setPage('Explore')}><Compass className="h-5 w-5" /></Button>
          <Button variant="ghost" onClick={() => setPage('Notifications')}><Bell className="h-5 w-5" /></Button>
          <Button variant="ghost" onClick={() => setPage('Messages')}><MessageSquare className="h-5 w-5" /></Button>
          <Button variant="ghost" onClick={() => setPage('Bookmarks')}><Bookmark className="h-5 w-5" /></Button>
        </div>
      </div>
    </div>
  );
}

function InstaLayout({ children }) {
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      <aside className="hidden lg:block">
        <div className="p-3 border rounded-lg">
          <div className="font-semibold mb-2">Profile</div>
          <div className="flex items-center gap-3">
            <Avatar><AvatarFallback>Y</AvatarFallback></Avatar>
            <div>
              <div className="font-medium">You</div>
              <div className="text-sm text-neutral-500">@you</div>
            </div>
          </div>
        </div>
        <div className="mt-4 p-3 border rounded-lg">
          <div className="font-semibold mb-2">Communities</div>
          <ul className="text-sm space-y-2">
            {communities.map(c => <li key={c.id}><b>{c.name}</b><div className="text-neutral-500 text-xs">{c.desc}</div></li>)}
          </ul>
        </div>
      </aside>
      <main className="lg:col-span-2">
        {children}
      </main>
      <aside className="hidden lg:block">
        <div className="p-3 border rounded-lg mb-4">
          <div className="font-semibold">Trending</div>
          <ul className="mt-2 space-y-1 text-sm">
            {trendingTopics.map(t => <li key={t}>{t}</li>)}
          </ul>
        </div>
        <div className="p-3 border rounded-lg">
          <div className="font-semibold">Suggested</div>
          <div className="mt-2 text-sm">Follow ACME • GVLT • FinEdge</div>
        </div>
      </aside>
    </div>
  );
}

function HomeFeed({ nationalOnly }) {
  const filtered = instaPosts.filter(p => nationalOnly ? p.national : true);
  return (
    <div className="space-y-6">
      <div className="p-3 border rounded-lg">
        <div className="flex items-center gap-3 mb-3">
          <Avatar><AvatarFallback>Y</AvatarFallback></Avatar>
          <Input placeholder="Share company updates, charts or insights" />
        </div>
        <div className="flex gap-2 justify-end">
          <Button size="sm">Post</Button>
        </div>
      </div>
      {filtered.map(p => (
        <Card key={p.id}>
          <CardContent className="p-0">
            <div className="flex items-center gap-3 p-3">
              <Avatar><AvatarFallback>{p.user.name[0]}</AvatarFallback></Avatar>
              <div>
                <div className="font-semibold">{p.user.name}</div>
                <div className="text-sm text-neutral-500">{p.user.handle}</div>
              </div>
            </div>
            <img src={p.image} alt="post" className="w-full object-cover max-h-[480px]" />
            <div className="p-3">
              <div className="flex gap-4 mb-2">
                <Heart className="h-5 w-5" />
                <MessageSquare className="h-5 w-5" />
                <Share2 className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{p.likes} likes</div>
              <div className="mt-1 text-sm"><b>{p.user.name}</b> {p.caption}</div>
              <div className="mt-2 text-xs text-neutral-500">View all {p.comments} comments</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ExplorePage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <h2 className="font-bold text-xl mb-2">Explore</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <img src="https://source.unsplash.com/400x400/?stocks" className="rounded-lg" />
          <img src="https://source.unsplash.com/400x400/?finance" className="rounded-lg" />
          <img src="https://source.unsplash.com/400x400/?crypto" className="rounded-lg" />
          <img src="https://source.unsplash.com/400x400/?trading" className="rounded-lg" />
          <img src="https://source.unsplash.com/400x400/?startup" className="rounded-lg" />
          <img src="https://source.unsplash.com/400x400/?analytics" className="rounded-lg" />
        </div>
      </div>
    </InstaLayout>
  );
}

function NotificationsPage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <h2 className="font-bold text-xl mb-2">Notifications</h2>
        <ul className="space-y-2">
          {notifications.map(n => <li key={n.id} className="text-sm">{n.text} <span className="text-neutral-400">· {n.time}</span></li>)}
        </ul>
      </div>
    </InstaLayout>
  );
}

function MessagesPage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <h2 className="font-bold text-xl mb-2">Messages</h2>
        <ul className="space-y-3">
          {messages.map(m => (
            <li key={m.id} className={`p-2 border rounded ${m.unread ? 'bg-neutral-50' : ''}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{m.from} <span className="text-sm text-neutral-500">{m.handle}</span></div>
                  <div className="text-sm text-neutral-700">{m.text}</div>
                </div>
                {m.unread && <div className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">New</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InstaLayout>
  );
}

function BookmarksPage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <h2 className="font-bold text-xl mb-2">Bookmarks</h2>
        <ul className="space-y-2 text-sm">
          {bookmarks.map(b => <li key={b.id}><b>{b.title}</b> <div className="text-neutral-500 text-xs">{b.meta}</div></li>)}
        </ul>
      </div>
    </InstaLayout>
  );
}

function MarketsPage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg mb-4">
        <h2 className="font-bold text-xl mb-2">Markets</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent>
              <div className="font-semibold">NIFTY 50</div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={niftyData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="d" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="v" stroke="currentColor" fillOpacity={0.1} fill="currentColor" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="font-semibold">BSE Sensex (approx)</div>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bseData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="d" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="v" stroke="currentColor" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </InstaLayout>
  );
}

function CompaniesPage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <h2 className="font-bold text-xl mb-2">NIFTY 50 Companies (sample)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nifty50.map(c => (
            <div key={c.symbol} className="p-3 border rounded-lg flex gap-3 items-center">
              <Avatar><AvatarFallback>{c.symbol[0]}</AvatarFallback></Avatar>
              <div>
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-neutral-500">{c.symbol}</div>
                <div className="mt-2 text-sm">Recent update: Quarterly results / Guidance</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </InstaLayout>
  );
}

function CommunitiesPage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <h2 className="font-bold text-xl mb-2">Communities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {communities.map(c => (
            <div key={c.id} className="p-3 border rounded-lg">
              <div className="font-semibold">{c.name}</div>
              <div className="text-sm text-neutral-500">{c.desc}</div>
              <div className="mt-2 text-sm">Top posts and pinned discussions appear here.</div>
            </div>
          ))}
        </div>
      </div>
    </InstaLayout>
  );
}

function ProfilePage() {
  return (
    <InstaLayout>
      <div className="p-3 border rounded-lg">
        <div className="flex items-center gap-4">
          <Avatar size="lg"><AvatarFallback>Y</AvatarFallback></Avatar>
          <div>
            <div className="font-bold text-xl">You</div>
            <div className="text-sm text-neutral-500">@you • Investor • Founder</div>
            <div className="mt-2 text-sm">Bio: Active investor and startup mentor. Sharing market insights and company updates.</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <img src="https://source.unsplash.com/300x300/?chart,stock" className="rounded-lg" />
          <img src="https://source.unsplash.com/300x300/?meeting,startup" className="rounded-lg" />
          <img src="https://source.unsplash.com/300x300/?conference,finance" className="rounded-lg" />
        </div>
      </div>
    </InstaLayout>
  );
}

export default function StockGramApp() {
  const [page, setPage] = useState('Home');
  const [nationalOnly, setNationalOnly] = useState(true);

  const render = () => {
    switch (page) {
      case 'Home': return <HomeFeed nationalOnly={nationalOnly} />;
      case 'Explore': return <ExplorePage />;
      case 'Notifications': return <NotificationsPage />;
      case 'Messages': return <MessagesPage />;
      case 'Bookmarks': return <BookmarksPage />;
      case 'Markets': return <MarketsPage />;
      case 'Companies': return <CompaniesPage />;
      case 'Communities': return <CommunitiesPage />;
      case 'Profile': return <ProfilePage />;
      default: return <HomeFeed nationalOnly={nationalOnly} />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <TopBar nationalOnly={nationalOnly} setNationalOnly={setNationalOnly} setPage={setPage} />
      <div className="flex">
        <div className="w-64 hidden lg:block p-4 border-r">
          <div className="font-bold mb-4">Sections</div>
          <div className="space-y-2">
            <Button variant="ghost" onClick={() => setPage('Home')}>Home</Button>
            <Button variant="ghost" onClick={() => setPage('Explore')}>Explore</Button>
            <Button variant="ghost" onClick={() => setPage('Notifications')}>Notifications</Button>
            <Button variant="ghost" onClick={() => setPage('Messages')}>Messages</Button>
            <Button variant="ghost" onClick={() => setPage('Bookmarks')}>Bookmarks</Button>
            <Button variant="ghost" onClick={() => setPage('Markets')}>Markets</Button>
            <Button variant="ghost" onClick={() => setPage('Companies')}>Companies</Button>
            <Button variant="ghost" onClick={() => setPage('Communities')}>Communities</Button>
            <Button variant="ghost" onClick={() => setPage('Profile')}>Profile</Button>
          </div>
        </div>
        <div className="flex-1">
          {render()}
        </div>
        <div className="w-80 hidden xl:block p-4 border-l">
          <div className="p-3 border rounded-lg mb-4">
            <div className="font-semibold">Trending Topics</div>
            <ul className="mt-2 text-sm space-y-1">
              {trendingTopics.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="p-3 border rounded-lg">
            <div className="font-semibold">Who to follow</div>
            <div className="mt-2 text-sm">FinEdge • MarketPulse • QuantCraft</div>
          </div>
        </div>
      </div>
    </div>
  );
}
