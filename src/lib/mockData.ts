// src/lib/mockData.ts

export const DEMO_TREES = [
    {
        id: "mock-tree-1",
        name: "The Royal Bloodline",
        description: "Tracing ancestry back to the 18th century.",
        created_at: new Date().toISOString(),
        _count: { family_members: 12 }
    },
    {
        id: "mock-tree-2",
        name: "Maternal Heritage",
        description: "Generations of artists and writers from maternal side.",
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        _count: { family_members: 8 }
    },
    {
        id: "mock-tree-3",
        name: "Smith Family Legacy",
        description: "A compact modern family tree.",
        created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
        _count: { family_members: 3 }
    }
];

export const DEMO_MEMBERS = [
    {
        id: "m1",
        tree_id: "mock-tree-1",
        first_name: "Arthur",
        last_name: "Pendragon",
        birth_date: "1920-04-15",
        death_date: "2005-11-20",
        gender: "male",
        blood_group: "O+",
        place_of_birth: "London, UK",
        bio: "The patriarch of the family. A decorated veteran and celebrated author who established the family estate.",
        parent_id: null,
        profession: "Author",
        health: { flags: ["Heart Disease", "High Blood Pressure"] }
    },
    {
        id: "m2",
        tree_id: "mock-tree-1",
        first_name: "Eleanor",
        last_name: "Pendragon",
        birth_date: "1948-06-12",
        death_date: null,
        gender: "female",
        blood_group: "A-",
        place_of_birth: "Paris, France",
        bio: "A renowned botanical scientist. She spent her life studying rare flora across South America.",
        parent_id: "m1",
        profession: "Botanist",
        health: { flags: [] }
    },
    {
        id: "m3",
        tree_id: "mock-tree-1",
        first_name: "Thomas",
        last_name: "Pendragon",
        birth_date: "1952-11-03",
        death_date: null,
        gender: "male",
        blood_group: "O+",
        place_of_birth: "London, UK",
        bio: "A successful architect who designed several prominent museums across Europe.",
        parent_id: "m1",
        profession: "Architect",
        health: { flags: ["Diabetes"] }
    },
    {
        id: "m4",
        tree_id: "mock-tree-1",
        first_name: "Sophia",
        last_name: "Pendragon",
        birth_date: "1980-02-28",
        death_date: null,
        gender: "female",
        blood_group: "O+",
        place_of_birth: "Berlin, Germany",
        bio: "Modern artist whose work is exhibited globally.",
        parent_id: "m2",
        profession: "Artist",
        health: { flags: ["Allergies"] }
    },
    {
        id: "m5",
        tree_id: "mock-tree-1",
        first_name: "Julian",
        last_name: "Pendragon",
        birth_date: "1984-09-17",
        death_date: null,
        gender: "male",
        blood_group: "O-",
        place_of_birth: "New York, USA",
        bio: "Tech entrepreneur running a successful AI startup.",
        parent_id: "m3",
        profession: "Software Engineer",
        health: { flags: [] }
    }
];

export const DEMO_MEMORIES = [
    {
        id: "mem1",
        title: "The Summer Estate",
        description: "An old photograph of the family summer home right after its construction.",
        date: "1955-07-20",
        tags: ["Historical", "Estate"],
        type: "photo",
        author: "Arthur Pendragon"
    },
    {
        id: "mem2",
        title: "Eleanor's First Expedition",
        description: "Records of Eleanor's first successful botanical journey through the Amazon.",
        date: "1972-04-10",
        tags: ["Achievement", "Travel"],
        type: "document",
        author: "Eleanor Pendragon"
    },
    {
        id: "mem3",
        title: "Family Reunion '99",
        description: "A digital restoration of the video tape from our massive family gathering.",
        date: "1999-08-15",
        tags: ["Reunion", "Video"],
        type: "video",
        author: "Julian Pendragon"
    }
];

export const DEMO_HEALTH_STATS = {
    bloodGroups: {
        'O+': 2,
        'A-': 1,
        'O-': 1,
        'Unknown': 1
    },
    conditions: [
        { name: "Heart Disease", count: 1 },
        { name: "High Blood Pressure", count: 1 },
        { name: "Diabetes", count: 1 },
        { name: "Allergies", count: 1 }
    ],
    longevityAvg: 85
};

// Expose a helper to gracefully check dev mode
export const isDevMode = () => {
    return process.env.NODE_ENV === 'development';
};
