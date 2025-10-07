import ProfileForm from "@/components/ProfileForm";

export default function TenantProfilePage () {
    return <div>
        <h1 className="text-2xl font-bold mb-4">Tenant Profile Page</h1>
        <ProfileForm userType="tenant" />
    </div>
}