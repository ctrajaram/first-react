export default function Card({
    imageSrc,
    imageAlt,
    name,
    role,
    email,
    about,
    interests,
}) {
    return (
        <div className="card">
            <div className="card-header">
                <img src={imageSrc} alt={imageAlt} />
                <div className="card-header-body">
                    <h2>{name}</h2>
                    <p>{role}</p>
                    <a className="email-btn" href={`mailto:${email}`}>
                        ✉ Email
                    </a>
                </div>
            </div>

            <div className="card-section">
                <h4>About</h4>
                <p>{about}</p>
            </div>

            <div className="card-section">
                <h4>Interests</h4>
                <p>{interests}</p>
            </div>
        </div>
    )
}