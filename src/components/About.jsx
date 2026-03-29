import Card from '../components/Card'
import CardHeader from '../components/CardHeader'
import CardAbout from '../components/CardAbout'
import CardInterests from '../components/CardInterests'

export default function About() {
    return (
        <main>
            <div className="about">
                <Card>
                    <CardHeader />
                    <CardAbout />
                    <CardInterests />
                </Card>
            </div>
        </main>
    )
}

