import OrgPicture from "@/assets/pictures/IMG_5455.jpeg";
import OrgPicture1 from "@/assets/pictures/IMG_6893.jpeg";
import OrgPicture2 from "@/assets/pictures/IMG_7095.jpeg";
import OrgPicture3 from "@/assets/pictures/IMG_7101.jpeg";
import OrgPicture4 from "@/assets/pictures/IMG_7505.jpeg";
import pic1 from "@/assets/pictures/person1.jpg";
import pic2 from "@/assets/pictures/person2.jpg";
import pic3 from "@/assets/pictures/person3.jpg";
import pic4 from "@/assets/pictures/person4.jpg";
import pic5 from "@/assets/pictures/person5.jpg";

import HeaderPicture1 from "@/assets/pictures/women.png";
import HeaderPicture2 from "@/assets/pictures/tech.jpg";
import HeaderPicture3 from "@/assets/pictures/cisco.png";
import HeaderPicture4 from "@/assets/pictures/tft.jpg";

import Logo1 from "@/sample_data/sample_orgs/gdg_circle.png";
import Logo2 from "@/sample_data/sample_orgs/awscc_circle.png";
import Logo3 from "@/sample_data/sample_orgs/cisco_connect.jpg";
import Logo4 from "@/sample_data/sample_orgs/pup_circle.png";

export const events = [
    {
        id: '1',
        name: "Women in Tech Conference",
        host: "PUP Women in Computing",
        description: "Empowering women in technology! 🌟 Join us for an inspiring day of talks, workshops, and networking with female leaders in the tech industry. Whether you're a student, professional, or enthusiast, this event is designed to inspire and connect the next generation of women in tech.",
        category: "University Event",
        followers: 800,
        imageSrc: "./src/sample_data/sample_orgs/awscc_circle.png",
        price: 0,
        start_date: new Date('2025-06-15T10:00:00'),
        end_date: new Date('2025-06-15T18:00:00'),
        start_time: "10:00",
        end_time: "18:00",
        headerImage: HeaderPicture1,
        logoImage:Logo1,
        location: {
            venue: "PUP Main Campus - Auditorium",
            type: "In-Person"
        },
        rsvpLink: "https://forms.gle/7SEX8pXWL5SEkT7N8",
        attendees: 400,
        registrationStatus: "open",
        hosts: [
            { name: "Angela Ramos", picture: pic3 },
            { name: "Bianca Cruz", picture: pic3 },
            { name: "Samantha Reyes", picture: pic3 },
            { name: "Veronica Bautista", picture: pic3 },
            { name: "Clarisse Mendoza", picture: pic3 },
        ]
    },

    {
        id: '2',
        name: "Tech Innovation Summit",
        host: "PUP Computer Society",
        description: "Stay ahead of the curve with the latest advancements in technology! 🔥 The Tech Innovation Summit brings together industry experts, innovators, and students to discuss the future of AI, cybersecurity, cloud computing, and more. Be part of the conversation and gain insights that will shape tomorrow!",
        category: "University Event",
        followers: 500,
        imageSrc: "./src/sample_data/sample_orgs/awscc_circle.png",
        price: 0,
        start_date: new Date('2025-05-05T09:00:00'),
        end_date: new Date('2025-05-05T17:00:00'),
        start_time: "09:00",
        end_time: "17:00",
        headerImage: HeaderPicture2,
        logoImage: Logo2,
        location: {
            venue: "PUP Main Campus - Conference Hall",
            type: "In-Person"
        },
        rsvpLink: "https://forms.gle/wiL4g6uFn7433CTd6",
        attendees: 300,
        registrationStatus: "open",
        hosts: [
            { name: "Lorenzo Castillo", picture: pic2 },
            { name: "Camille Mendoza", picture: pic2 },
            { name: "Jasmine Cruz", picture: pic2 },
            { name: "Emilio Garcia", picture: pic2 },
            { name: "Nathaniel Flores", picture: pic2 },
        ]
    },

    {
        id: '3',
        name: "Cisco PUP Connect Year-End Party 2025",
        host: "Cisco PUP Connect",
        description: "Celebrate the end of the year with an exciting night of networking, games, and prizes! 🎉 Join us as we wrap up 2025 with food, fun, and unforgettable moments. Don't miss out on this chance to connect with fellow tech enthusiasts and industry professionals!",
        category: "Uni-wide",
        followers: 200,
        imageSrc: "./src/sample_data/sample_orgs/gdg_circle.png",
        price: 100,
        start_date: new Date('2025-12-10T18:00:00'),
        end_date: new Date('2025-12-10T23:59:59'),
        start_time: "18:00",
        end_time: "23:59",
        headerImage: HeaderPicture3,
        logoImage: Logo3,
        location: {
            venue: "Cisco PUP Campus - Main Hall",
            type: "In-Person"
        },
        rsvpLink: "https://forms.gle/iao7CwWCEJKdi6PQ7",
        attendees: 150,
        registrationStatus: "open",
        hosts: [
            { name: "Miguel Ramos", picture: pic1 },
            { name: "Andrea Villanueva", picture: pic1 },
            { name: "Rafael Cruz", picture: pic1 },
            { name: "Sofia Bautista", picture: pic1 },
            { name: "Daniel Perez", picture: pic1 },
        ]
    },

    {
        id: '4',
        name: "PUP CCIS Student Council TFT Tournament 2025",
        host: "CCIS Student Council",
        description: "Test your skills in the ultimate TFT showdown! 🎮 The PUP CCIS Student Council invites you to compete in the TFT Liga Republika 2025 Open Qualifiers. Battle through seven rounds of single-elimination matches for a chance to secure your spot in the group stage. Who will rise to the top? 🏆",
        category: "University Event",
        followers: 500,
        imageSrc: "./src/sample_data/sample_orgs/pup_circle.png",
        price: 0,
        start_date: new Date('2025-04-20T09:00:00'),
        end_date: new Date('2025-04-20T17:00:00'),
        start_time: "09:00",
        end_time: "17:00",
        headerImage: HeaderPicture4,
        logoImage: Logo4,
        location: {
            venue: "Facebook Live",
            type: "Online"
        },
        rsvpLink: "https://forms.gle/xVFoET4zanWi2Bh8A",
        attendees: 100,
        registrationStatus: "open",
        hosts: [
            { name: "Bea Santos", picture: OrgPicture },
            { name: "Carlos Abad", picture: OrgPicture1 },
            { name: "Joaquin Reyes", picture: OrgPicture2 },
            { name: "Manuel Dela Cruz", picture: OrgPicture3 },
            { name: "Isabela Navarro", picture: OrgPicture4 },
        ]
    },
];

export const orgs = [
    {
        name: "AWS Cloud Club PUP",
        description: "A community for cloud computing enthusiasts! ☁️ Join AWS Cloud Club PUP to learn about cloud technologies, get hands-on experience with AWS, and collaborate on exciting cloud-based projects.",
        category: "Tech Organization",
        followers: 3000,
        imageSrc: "./src/sample_data/sample_orgs/awscc_circle.png",
    },

    {
        name: "Creative Arts Club",
        description: "Unleash your creativity! 🎨 The Creative Arts Club is a space for students passionate about painting, drawing, digital art, and crafts. Join us for workshops, exhibitions, and collaborative projects.",
        category: "Arts Organization",
        followers: 150,
        imageSrc: "./src/sample_data/sample_orgs/gdg_circle.png",
    },

    {
        name: "PUP Esports Club",
        description: "For gamers, by gamers! 🎮 The PUP Esports Club brings together students who love competitive gaming, whether it's FPS, MOBAs, or strategy games. Join our tournaments, scrims, and training sessions!",
        category: "Gaming Organization",
        followers: 1200,
        imageSrc: "./src/sample_data/sample_orgs/pup_circle.png",
    },

    {
        name: "Society of Information",
        description: "Building the future of IT professionals! 💻 The PSITS-PUP chapter is dedicated to enhancing the skills of IT students through training, hackathons, networking, and industry collaborations.",
        category: "Tech Organization",
        followers: 2500,
        imageSrc: "./src/sample_data/sample_orgs/cisco_connect.jpg",
    },

    {
        name: "PUP Debate Society",
        description: "Sharpen your critical thinking and public speaking skills! 🗣️ The PUP Debate Society welcomes students who love discussing ideas, competing in debate tournaments, and engaging in intellectual discourse.",
        category: "Academic Organization",
        followers: 900,
        imageSrc: "./src/sample_data/sample_orgs/pup_circle.png",
    },
];
