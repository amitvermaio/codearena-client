import { subDays, format, add } from 'date-fns';

const mockProblems = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', tags: ['Array', 'Hash Table'], acceptance: '49.1%', status: 'Solved', testCases: [
      { input: "[2,7,11,15]\n9", output: "[0,1]" },
      { input: "[3,2,4]\n6", output: "[1,2]" },
      { input: "[3,3]\n6", output: "[0,1]", isHidden: true }
  ] },
  { id: '2', title: 'Add Two Numbers', difficulty: 'Medium', tags: ['Linked List', 'Math'], acceptance: '38.6%', status: 'Attempted' },
  { id: '3', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['Hash Table', 'String', 'Sliding Window'], acceptance: '33.5%', status: 'Todo', isPOTD: true, hints: ['Use a sliding window approach with a hash map to keep track of character indices.'] },
  { id: '4', title: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['Array', 'Binary Search', 'Divide and Conquer'], acceptance: '34.2%', status: 'Todo' },
  { id: '5', title: 'Valid Parentheses', difficulty: 'Easy', tags: ['String', 'Stack'], acceptance: '40.6%', status: 'Solved' },
  { id: '6', title: 'Merge k Sorted Lists', difficulty: 'Hard', tags: ['Linked List', 'Heap', 'Divide and Conquer'], acceptance: '44.9%', status: 'Todo' },
  { id: '7', title: 'Container With Most Water', difficulty: 'Medium', tags: ['Array', 'Two Pointers'], acceptance: '53.2%', status: 'Solved' },
  { id: '8', title: '3Sum', difficulty: 'Medium', tags: ['Array', 'Two Pointers', 'Sorting'], acceptance: '28.9%', status: 'Attempted' },
];

const mockRecentSubmissions = [
    { id: 'sub1', problem: { id: '1', title: 'Two Sum' }, status: 'Accepted', language: 'JavaScript', submittedAt: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm') },
    { id: 'sub2', problem: { id: '5', title: 'Valid Parentheses' }, status: 'Accepted', language: 'Python', submittedAt: format(subDays(new Date(), 2), 'yyyy-MM-dd HH:mm') },
    { id: 'sub3', problem: { id: '7', title: 'Container With Most Water' }, status: 'Accepted', language: 'Java', submittedAt: format(subDays(new Date(), 3), 'yyyy-MM-dd HH:mm') },
    { id: 'sub4', problem: { id: '2', title: 'Add Two Numbers' }, status: 'Wrong Answer', language: 'JavaScript', submittedAt: format(subDays(new Date(), 4), 'yyyy-MM-dd HH:mm') },
    { id: 'sub5', problem: { id: '8', title: '3Sum' }, status: 'Time Limit Exceeded', language: 'Python', submittedAt: format(subDays(new Date(), 5), 'yyyy-MM-dd HH:mm') },
];

const mockUsers = [
    {
        id: 'user1',
        username: 'janedoe',
        fullname: 'Jane Doe',
        email: 'jane.doe@codearena.io',
        profilePic: '',
        profileColor: 'blue',
        bio: 'Software Engineer at TechCorp | Competitive Programmer | Building cool things with React & Node.js',
        location: 'San Francisco, CA',
        portfolio: 'janedoe.dev',
        skills: ['React', 'TypeScript', 'Node.js', 'Python', 'GraphQL', 'Docker'],
        socials: {
            github: 'janedoe',
            twitter: 'janedoe_dev',
            linkedin: 'https://www.linkedin.com/in/janedoe'
        },
        problemSolved: 125,
        totalProblems: 500,
        rank: 1245,
        followers: 583,
        following: 72,
        solvedStats: {
          easy: 60,
          medium: 55,
          hard: 10
        },
        recentSubmissions: mockRecentSubmissions,
    },
     {
        id: 'user2',
        username: 'alexray',
        fullname: 'Alex Ray',
        email: 'alex.ray@codearena.io',
        profilePic: '',
        profileColor: 'green',
        bio: 'Frontend Developer | Vue & Nuxt Enthusiast',
        location: 'Berlin, Germany',
        portfolio: 'alexray.codes',
        skills: ['Vue.js', 'JavaScript', 'HTML5', 'CSS3', 'Nuxt.js'],
        socials: {
            github: 'alexray',
            twitter: 'alexray_codes',
            linkedin: 'https://www.linkedin.com/in/alexray'
        },
        problemSolved: 88,
        totalProblems: 500,
        rank: 2501,
        followers: 320,
        following: 95,
        solvedStats: {
            easy: 50,
            medium: 30,
            hard: 8
        },
        recentSubmissions: [],
    }
];

const mockContests = [
  { id: '1', slug: 'weekly-sprint-24', title: 'Weekly Sprint #24', type: 'platform', startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), duration: '2 hours', registered: true, imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop' },
  { id: '2', slug: 'data-structures-challenge', title: 'Data Structures Challenge', type: 'platform', startTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), duration: '3 hours', registered: false, imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop' },
  { id: '3', slug: 'algorithm-royale', title: 'Algorithm Royale', type: 'platform', startTime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), duration: '24 hours', registered: false, imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop' },
  { id: '4', slug: 'weekend-warmup', title: 'Weekend Warmup', type: 'platform', startTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), duration: '48 hours', registered: true, imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop' },
  { id: '5', slug: 'cs101-midterm-prep', title: 'CS101 Midterm Prep', type: 'community', creator: 'Prof. Anderson', startTime: add(new Date(), {days: 3}), duration: '2 hours', registered: false, imageUrl: 'https://images.unsplash.com/photo-1580894732444-8ecded794837?q=80&w=2070&auto=format&fit=crop' },
  { id: '6', slug: 'friend-terview-practice', title: 'Friend-terview Practice', type: 'community', creator: 'sarahw', startTime: add(new Date(), {days: 6}), duration: '1 hour', registered: false, imageUrl: 'https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=2070&auto=format&fit=crop' },
];

const mockConnections = [
  { id: 'user2', fullname: 'Alex Ray', username: 'alexray', profilePic: '', bio: 'Frontend Developer | Vue & Nuxt Enthusiast' },
  { id: 'user3', fullname: 'Sarah Wilson', username: 'sarahw', profilePic: '', bio: 'Data Scientist | Python & Machine Learning' },
  { id: 'user4', fullname: 'Mike Ross', username: 'mikeross', profilePic: '', bio: 'DevOps Engineer | AWS Certified' },
];

const mockRequests = [
  { id: 'user5', fullname: 'Emily Clark', username: 'emilyc', profilePic: '', bio: 'UX/UI Designer crafting beautiful experiences' },
];

const mockNotifications = [
    { id: '1', type: 'like', text: 'Alex Ray liked your post "Just solved my 50th problem..."', link: '/feed', read: false, createdAt: '15m ago' },
    { id: '2', type: 'comment', text: 'Sarah Wilson commented on your post "Just solved my 50th problem..."', link: 'feed', read: false, createdAt: '1h ago' },
    { id: '3', type: 'request', text: 'Emily Clark sent you a connection request.', link: '/connections', read: true, createdAt: '3h ago' },
    { id: '4', type: 'contest', text: 'The "Weekend Warmup" contest has started. Good luck!', link: '/contests/4', read: true, createdAt: '1d ago' },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProblems() {
    await delay(200);
    return mockProblems;
}

export async function getProblemById(id) {
    await delay(200);
    return mockProblems.find(p => p.id === id);
}

export async function getProblemOfTheDay() {
    await delay(200);
    return mockProblems.find(p => p.isPOTD) || null;
}

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

