import Profile from "./Profile"
import { useState, useEffect } from "react"

function ProfileSection() {
    const [profiles, setProfiles] = useState([])

    let allProfiles = profiles.map(profile =>
        <Profile username={profile.username} profileURL={profile.profileURL} />
    )

    useEffect(async () => {
        let response = await fetch(`/profile/users`)
        if (response.ok) {
            let result = await response.json()
            setProfiles(result)
        }
    }, [])


    return (
        <div>
            {allProfiles}
        </div>
    )
}
export default ProfileSection