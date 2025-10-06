import { NavUser } from "./NavUser"

export default function Navbar() {
    return <div>
        <NavUser user={{ name: "John Doe", email: "john@example.com", avatar: "https://via.placeholder.com/150" }} />
    </div>
}