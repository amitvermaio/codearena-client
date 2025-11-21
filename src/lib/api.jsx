import { subDays, format, add } from 'date-fns';

const mockContests = [
  { id: '1', slug: 'weekly-sprint-24', title: 'Weekly Sprint #24', type: 'platform', startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), duration: '2 hours', registered: true, imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', slug: 'data-structures-challenge', title: 'Data Structures Challenge', type: 'platform', startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), duration: '3 hours', registered: false, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', slug: 'algorithm-royale', title: 'Algorithm Royale', type: 'platform', startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), duration: '24 hours', registered: false, imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop' },
  { id: '4', slug: 'weekend-warmup', title: 'Weekend Warmup', type: 'platform', startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), duration: '48 hours', registered: true, imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop' },
  { id: '5', slug: 'cs101-midterm-prep', title: 'CS101 Midterm Prep', type: 'community', creator: 'Prof. Anderson', startTime: add(new Date(), {days: 3}), duration: '2 hours', registered: false, imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded794837?q=80&w=2070&auto=format&fit=crop' },
  { id: '6', slug: 'friend-terview-practice', title: 'Friend-terview Practice', type: 'community', creator: 'sarahw', startTime: add(new Date(), {days: 6}), duration: '1 hour', registered: false, imageUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getContests() {
    await delay(250);
    return mockContests.sort((a,b) => a.startTime.getTime() - b.startTime.getTime());
}

export async function getContestById(id) {
    await delay(200);
    return mockContests.find(c => c.id === id);
}

export async function getUserByUsername(username) {
    await delay(200);
    const user = mockUsers.find(u => u.username === username);
    if(user) user.profilePic = '';
    return user;
}

export async function getConnections() {
    await delay(200);
    return mockConnections.map(c => ({...c, profilePic: ''}));
}

export async function getRequests() {
    await delay(200);
    return mockRequests.map(r => ({...r, profilePic: ''}));
}

export async function getNotifications() {
    await delay(150);
    return mockNotifications;
}

