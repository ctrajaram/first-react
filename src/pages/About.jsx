import Card from '../components/Card'

export default function About() {
    return (
        <main>
            <div className="about">
                <Card
                    imageSrc="https://i.pravatar.cc/320?img=11"
                    imageAlt="CR profile photo"
                    name="CR"
                    role="React Developer"
                    email="ctrajar@gmail.com"
                    about="I enjoy learning React, improving my CSS, and building polished UI projects."
                    interests="Reading, chess, and exploring new web technologies."
                />
                <Card
                    imageSrc="https://i.pravatar.cc/320?img=32"
                    imageAlt="Maya profile photo"
                    name="Maya"
                    role="UI Designer"
                    email="maya@example.com"
                    about="I love turning ideas into clean, user-friendly interfaces with strong visual hierarchy."
                    interests="Typography, travel, design systems, and creative coding."
                />
            </div>
        </main>
    )
}
